import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

type Role = 'player' | 'moderator' | 'creator' | 'developer';

interface RoleConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

const roleConfigs: Record<Role, RoleConfig> = {
  player: {
    label: 'Игрок',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10 border-gray-400/30',
    icon: 'User'
  },
  moderator: {
    label: 'Модератор',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10 border-blue-400/30',
    icon: 'Shield'
  },
  creator: {
    label: 'Создатель',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10 border-purple-400/30',
    icon: 'Crown'
  },
  developer: {
    label: 'Разработчик',
    color: 'text-primary',
    bgColor: 'bg-primary/10 border-primary/30',
    icon: 'Code'
  }
};

const mockPlayerStats = {
  playtime: '234ч 12м',
  blocksPlaced: 45632,
  blocksBroken: 38291,
  deaths: 47,
  achievements: 78,
  totalAchievements: 120,
  seasonsPlayed: ['Сезон I: Пробуждение', 'Сезон II: Раскол', 'Сезон III: Тени Забытых']
};

export default function Profile() {
  const [currentRole, setCurrentRole] = useState<Role>('player');
  const roleConfig = roleConfigs[currentRole];

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur border-border/50 animate-scale-in">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/50">
                    <Icon name="User" size={64} className="text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">TestPlayer</h2>
                    <Badge className={`${roleConfig.bgColor} ${roleConfig.color} border`}>
                      <Icon name={roleConfig.icon as any} size={14} className="mr-1" />
                      {roleConfig.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Выбор роли (для тестирования)
                  </Label>
                  <Select value={currentRole} onValueChange={(value) => setCurrentRole(value as Role)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleConfigs).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <Icon name={config.icon as any} size={16} className={config.color} />
                            <span>{config.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Время в игре</span>
                    <span className="font-semibold">{mockPlayerStats.playtime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Последний визит</span>
                    <span className="font-semibold">Сегодня</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Регистрация</span>
                    <span className="font-semibold">01.03.2024</span>
                  </div>
                </div>

                <Separator />

                <Button className="w-full" variant="outline">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки профиля
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={24} className="text-primary" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Блоков поставлено</div>
                    <div className="text-2xl font-bold text-primary">{mockPlayerStats.blocksPlaced.toLocaleString()}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Блоков сломано</div>
                    <div className="text-2xl font-bold text-secondary">{mockPlayerStats.blocksBroken.toLocaleString()}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Смертей</div>
                    <div className="text-2xl font-bold text-destructive">{mockPlayerStats.deaths}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} className="text-accent" />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-semibold">
                      {mockPlayerStats.achievements} / {mockPlayerStats.totalAchievements}
                    </span>
                  </div>
                  <Progress 
                    value={(mockPlayerStats.achievements / mockPlayerStats.totalAchievements) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {[
                    { icon: 'Pickaxe', name: 'Шахтёр', color: 'text-gray-400' },
                    { icon: 'Sword', name: 'Воин', color: 'text-red-400' },
                    { icon: 'Home', name: 'Строитель', color: 'text-yellow-400' },
                    { icon: 'Compass', name: 'Исследователь', color: 'text-blue-400' }
                  ].map((achievement, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <Icon name={achievement.icon as any} size={32} className={achievement.color} />
                      <span className="text-xs text-center">{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} className="text-secondary" />
                  Участие в сезонах
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPlayerStats.seasonsPlayed.map((season, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="Sparkles" size={20} className="text-primary" />
                        <span className="font-semibold">{season}</span>
                      </div>
                      <Badge variant="outline">Завершён</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" size={24} className="text-accent" />
                  Постройки на карте
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Map" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Ваши постройки скоро появятся здесь</p>
                  <Button variant="link" className="mt-2">
                    Открыть карту мира
                    <Icon name="ExternalLink" size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
