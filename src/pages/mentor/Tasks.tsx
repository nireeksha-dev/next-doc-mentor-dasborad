import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  Flag, 
  FileText, 
  Paperclip,
  CheckSquare2,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockApi } from '@/mocks/api';

const TASK_COLUMNS = [
  { id: 'new', title: 'New', count: 0 },
  { id: 'in-progress', title: 'In Progress', count: 0 },
  { id: 'waiting-mentee', title: 'Waiting on Mentee', count: 0 },
  { id: 'done', title: 'Done', count: 0 },
];

const PRODUCT_COLORS = {
  'CVPro™': 'product-cvpro',
  'InterviewSim+™': 'product-interviewsim', 
  'SponsorMatch™': 'product-sponsormatch',
  'GapMap™': 'product-gapmap',
  'General': 'muted'
};

export function Tasks() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: mockApi.getTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: string }) =>
      mockApi.updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const filteredTasks = tasks?.filter((task: any) => {
    const matchesTab = activeTab === 'All' || task.type === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tasksByColumn = TASK_COLUMNS.map(column => ({
    ...column,
    tasks: filteredTasks?.filter((task: any) => task.status === column.id) || [],
    count: filteredTasks?.filter((task: any) => task.status === column.id).length || 0
  }));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    updateTaskMutation.mutate({ taskId: draggableId, status: newStatus });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Flag;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-64 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks & Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Manage CVPro™, InterviewSim+™, SponsorMatch™, GapMap™ reviews and general tasks
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Tabs and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="CVPro™">CVPro™</TabsTrigger>
                <TabsTrigger value="InterviewSim+™">InterviewSim+™</TabsTrigger>
                <TabsTrigger value="SponsorMatch™">SponsorMatch™</TabsTrigger>
                <TabsTrigger value="GapMap™">GapMap™</TabsTrigger>
                <TabsTrigger value="General">General</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tasksByColumn.map((column) => (
            <Card key={column.id} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  {column.title}
                  <Badge variant="outline">{column.count}</Badge>
                </CardTitle>
              </CardHeader>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <CardContent
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-64 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-accent/20' : ''
                    }`}
                  >
                    {column.tasks.map((task: any, index: number) => {
                      const PriorityIcon = getPriorityIcon(task.priority);
                      
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-card border rounded-lg shadow-sm cursor-move transition-all ${
                                snapshot.isDragging ? 'shadow-lg rotate-2 scale-105' : 'hover:shadow-md'
                              }`}
                            >
                              {/* Task Header */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                    {task.title}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs bg-${PRODUCT_COLORS[task.type as keyof typeof PRODUCT_COLORS]}/10`}
                                    >
                                      {task.type}
                                    </Badge>
                                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                                      <PriorityIcon className="h-3 w-3 mr-1" />
                                      {task.priority}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Task Details */}
                              <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <User className="h-3 w-3" />
                                  Mentee {task.menteeId.replace('mentee-', '')}
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  Due {new Date(task.dueDate).toLocaleDateString('en-GB')}
                                </div>

                                {task.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {task.description}
                                  </p>
                                )}
                              </div>

                              {/* Checklist Progress */}
                              {task.checklist?.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <CheckSquare2 className="h-3 w-3" />
                                    {task.checklist.filter((item: any) => item.completed).length} of {task.checklist.length} completed
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-1.5">
                                    <div 
                                      className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                                      style={{ 
                                        width: `${(task.checklist.filter((item: any) => item.completed).length / task.checklist.length) * 100}%` 
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              )}

                              {/* Task Footer */}
                              <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      M{task.menteeId.replace('mentee-', '')}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {task.attachments && (
                                    <Paperclip className="h-3 w-3" />
                                  )}
                                  <FileText className="h-3 w-3" />
                                  {new Date(task.createdAt).toLocaleDateString('en-GB')}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    
                    {column.tasks.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckSquare2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Droppable>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}