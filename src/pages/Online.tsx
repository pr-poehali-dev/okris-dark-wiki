import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const mockOnlinePlayers = [
  { nickname: 'TestPlayer', role: 'player', playtime: '234ч', status: 'В игре' },
  { nickname: 'BuilderPro', role: 'moderator', playtime: '567ч', status: 'Строит' },
  { nickname: 'Explorer123', role: 'player', playtime: '89ч', status: 'Исследует' },
  { nickname: 'AdminMike', role: 'creator', playtime: '1234ч', status: 'В админке' },
  { nickname: 'DevJohn', role: 'developer', playtime: '890ч', status: 'Тестирует' },
  { nickname: 'CrafterPro', role: 'player', playtime: '345ч', status: 'Крафтит' },
  { nickname: 'PvPMaster', role: 'player', playtime: '456ч', status: 'На арене' },
];

const roleColors: Record<string, { color: string; label: string; icon: string }> = {
  player: { color: 'text-gray-400 border-gray-400/30', label: 'Игрок', icon: 'User' },
  moderator: { color: 'text-blue-400 border-blue-400/30', label: 'Модератор', icon: 'Shield' },
  creator: { color: 'text-purple-400 border-purple-400/30', label: 'Создатель', icon: 'Crown' },
  developer: { color: 'text-primary border-primary/30', label: 'Разработчик', icon: 'Code' }
};

export default function Online() {
  return (
    <div className="min-h-screen bg-background bg-runes">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Castle" size={24} className="text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-glow">Окрис</span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Icon name="Home" size={16} className="mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-glow">
              <Icon name="Users" size={48} className="inline mr-4 text-primary" />
              Игроки онлайн
            </h1>
            <p className="text-xl text-muted-foreground">
              Кто сейчас в мире Окрис
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-scale-in">
            <Card className="bg-card/50 backdrop-blur border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                  Онлайн сейчас
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{mockOnlinePlayers.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-secondary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TrendingUp" size={20} className="text-secondary" />
                  Пик за сутки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-secondary">23</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="BarChart3" size={20} className="text-accent" />
                  Всего игроков
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-accent">156</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="Activity" size={24} className="text-primary" />
                  Список игроков
                </span>
                <Badge variant="outline">
                  <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse mr-2"></span>
                  Обновляется в реальном времени
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOnlinePlayers.map((player, index) => {
                  const roleConfig = roleColors[player.role];
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                          <Icon name="User" size={24} className="text-primary" />
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{player.nickname}</span>
                            <Badge variant="outline" className={`text-xs ${roleConfig.color}`}>
                              <Icon name={roleConfig.icon as any} size={12} className="mr-1" />
                              {roleConfig.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {player.playtime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Activity" size={14} />
                              {player.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/profile/${player.nickname}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Профиль
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 animate-fade-in">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Icon name="Gamepad2" size={48} className="mx-auto text-primary" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Присоединяйтесь к игре!</h3>
                  <p className="text-muted-foreground">
                    Станьте частью сообщества Окрис и начните своё приключение
                  </p>
                </div>
                <Link to="/auth">
                  <Button size="lg" className="box-glow">
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать играть
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
