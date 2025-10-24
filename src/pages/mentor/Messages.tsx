import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Paperclip, 
  Smile, 
  MoreHorizontal,
  Phone,
  Video,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { mockApi } from '@/mocks/api';

export function Messages() {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: mockApi.getMessages,
  });

  const { data: threadData } = useQuery({
    queryKey: ['thread', selectedThread],
    queryFn: () => selectedThread ? mockApi.getThread(selectedThread) : null,
    enabled: !!selectedThread,
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In real implementation, send message via API
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Threads List */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Badge variant="destructive">
              {messages?.reduce((acc: number, m: any) => acc + m.unreadCount, 0) || 0}
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-0">
          {messages && messages.length > 0 ? (
            <div className="space-y-1">
              {messages.map((thread: any, index: number) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => setSelectedThread(thread.id)}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-2 ${
                    selectedThread === thread.id 
                      ? 'bg-primary/5 border-primary' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        M{thread.menteeId.replace('mentee-', '')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-sm">
                          Mentee {thread.menteeId.replace('mentee-', '')}
                        </div>
                        {thread.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 rounded-full p-1.5 text-xs">
                            {thread.unreadCount}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {thread.lastMessage.content}
                      </p>
                      
                      <div className="text-xs text-muted-foreground ">
                        {new Date(thread.lastMessage.timestamp).toLocaleString('en-GB')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 text-muted-foreground space-y-3">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <div>
                <p className="text-sm font-medium mb-1">No new messages yet</p>
                <div className="flex items-start gap-2 max-w-xs mx-auto mt-3 p-3 bg-muted/50 rounded-lg">
                  <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-left">
                    <strong>Tip:</strong> Mentors with &lt;24hr reply rates have 3x higher mentee engagement.
                    Quick responses improve your visibility to new mentees.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message View */}
      <Card className="flex-1 flex flex-col">
        {selectedThread && threadData ? (
          <>
            {/* Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      M{selectedThread.replace('thread-', '')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      Mentee {selectedThread.replace('thread-', '')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      PLAB Preparation • Internal Medicine
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {threadData.messages?.map((message: any, index: number) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`flex ${
                    message.senderType === 'mentor' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.senderType === 'mentor' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  } rounded-lg p-3`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderType === 'mentor' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-3">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={2}
                    className="resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a mentee from the sidebar to start messaging.
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}