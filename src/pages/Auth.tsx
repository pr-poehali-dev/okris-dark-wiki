import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Вход выполнен!",
        description: "Добро пожаловать в Окрис",
      });
      navigate('/profile/test-player');
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Регистрация успешна!",
        description: "Аккаунт создан. Добро пожаловать!",
      });
      navigate('/profile/test-player');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background bg-runes flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Castle" size={28} className="text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-glow">Окрис</span>
        </Link>

        <Card className="bg-card/80 backdrop-blur border-border/50 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Добро пожаловать</CardTitle>
            <CardDescription className="text-center">
              Войдите или создайте аккаунт для доступа к миру Окрис
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email или никнейм</Label>
                    <Input 
                      id="login-email" 
                      type="text" 
                      placeholder="steve@minecraft.net"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input 
                      id="login-password" 
                      type="password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full box-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Вход...
                      </>
                    ) : (
                      <>
                        <Icon name="LogIn" size={16} className="mr-2" />
                        Войти
                      </>
                    )}
                  </Button>
                  <div className="text-center">
                    <Button variant="link" className="text-sm text-muted-foreground">
                      Забыли пароль?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-nickname">Никнейм в игре</Label>
                    <Input 
                      id="register-nickname" 
                      type="text" 
                      placeholder="Steve"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="steve@minecraft.net"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input 
                      id="register-password" 
                      type="password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password-confirm">Повторите пароль</Label>
                    <Input 
                      id="register-password-confirm" 
                      type="password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full box-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Регистрация...
                      </>
                    ) : (
                      <>
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Зарегистрироваться
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Или войдите через
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Icon name="Github" size={16} className="mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            <Icon name="ArrowLeft" size={14} className="inline mr-1" />
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
