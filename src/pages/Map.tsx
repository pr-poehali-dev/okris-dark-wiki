import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function Map() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPlayers, setShowPlayers] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showRegions, setShowRegions] = useState(false);

  const mockOnlinePlayers = [
    { name: 'TestPlayer', x: 100, z: -200 },
    { name: 'BuilderPro', x: -450, z: 320 },
    { name: 'Explorer123', x: 890, z: -150 }
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="min-h-screen bg-background bg-runes">
      {!isFullscreen && (
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
      )}

      <div className="container mx-auto px-4 py-8">
        {!isFullscreen && (
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-glow">
              <Icon name="Map" size={42} className="inline mr-3 text-primary" />
              Интерактивная карта мира
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Исследуйте мир Окрис в реальном времени. Следите за игроками, ключевыми локациями и границами регионов.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          <div className={`${isFullscreen ? 'hidden' : 'lg:block'} space-y-4 animate-scale-in`}>
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-players" className="flex items-center gap-2">
                    <Icon name="Users" size={18} className="text-primary" />
                    Игроки онлайн
                  </Label>
                  <Switch
                    id="show-players"
                    checked={showPlayers}
                    onCheckedChange={setShowPlayers}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-markers" className="flex items-center gap-2">
                    <Icon name="MapPin" size={18} className="text-accent" />
                    Маркеры лора
                  </Label>
                  <Switch
                    id="show-markers"
                    checked={showMarkers}
                    onCheckedChange={setShowMarkers}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-regions" className="flex items-center gap-2">
                    <Icon name="Square" size={18} className="text-secondary" />
                    Границы регионов
                  </Label>
                  <Switch
                    id="show-regions"
                    checked={showRegions}
                    onCheckedChange={setShowRegions}
                  />
                </div>
              </CardContent>
            </Card>

            {showPlayers && (
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Users" size={20} className="text-primary" />
                    <h3 className="font-semibold">Игроки онлайн ({mockOnlinePlayers.length})</h3>
                  </div>
                  {mockOnlinePlayers.map((player, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium">{player.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {player.x}, {player.z}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {showMarkers && (
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="MapPin" size={20} className="text-accent" />
                    <h3 className="font-semibold">Ключевые локации</h3>
                  </div>
                  {[
                    { name: 'Обелиск', icon: 'Zap', color: 'text-primary' },
                    { name: 'Врата Севера', icon: 'Landmark', color: 'text-secondary' },
                    { name: 'Библиотека Забытых', icon: 'BookOpen', color: 'text-accent' },
                    { name: 'Разлом', icon: 'AlertTriangle', color: 'text-destructive' }
                  ].map((location, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <Icon name={location.icon as any} size={16} className={location.color} />
                      <span className="text-sm">{location.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className={`${isFullscreen ? 'col-span-full' : 'lg:col-span-3'} animate-fade-in`}>
            <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
              <CardContent className="p-0 relative">
                <div 
                  className={`${isFullscreen ? 'h-screen' : 'h-[600px]'} bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 grid grid-cols-8 gap-px opacity-10">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="bg-primary/20"></div>
                    ))}
                  </div>

                  <div className="relative z-10 text-center space-y-4">
                    <Icon name="Map" size={64} className="mx-auto text-muted-foreground/50" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Интерактивная карта</h3>
                      <p className="text-muted-foreground max-w-md">
                        Здесь будет отображаться динамическая карта мира через BlueMap или Overviewer
                      </p>
                    </div>
                    <div className="pt-4">
                      <Badge variant="outline" className="text-base px-4 py-2">
                        <Icon name="RefreshCw" size={16} className="mr-2" />
                        Обновление каждые 5 минут
                      </Badge>
                    </div>
                  </div>

                  {showPlayers && (
                    <>
                      {mockOnlinePlayers.map((player, i) => (
                        <div
                          key={i}
                          className="absolute w-8 h-8 rounded-full bg-primary/30 border-2 border-primary flex items-center justify-center animate-glow-pulse cursor-pointer"
                          style={{
                            left: `${30 + i * 20}%`,
                            top: `${40 + i * 10}%`
                          }}
                          title={player.name}
                        >
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                      ))}
                    </>
                  )}

                  {showMarkers && (
                    <>
                      <div
                        className="absolute w-10 h-10 rounded-full bg-accent/30 border-2 border-accent flex items-center justify-center cursor-pointer"
                        style={{ left: '50%', top: '50%' }}
                        title="Обелиск"
                      >
                        <Icon name="Zap" size={20} className="text-accent" />
                      </div>
                    </>
                  )}

                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="backdrop-blur-sm"
                      onClick={toggleFullscreen}
                    >
                      <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={20} />
                    </Button>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Координаты</div>
                    <div className="font-mono text-sm font-semibold">X: 0 | Y: 64 | Z: 0</div>
                  </div>

                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                      <Icon name="ZoomIn" size={16} className="mr-2" />
                      Увеличить
                    </Button>
                    <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                      <Icon name="ZoomOut" size={16} className="mr-2" />
                      Уменьшить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!isFullscreen && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>
                  Для интеграции с реальной картой необходимо установить BlueMap или Overviewer на сервер. 
                  <Button variant="link" className="px-2">
                    Инструкция по настройке
                    <Icon name="ExternalLink" size={14} className="ml-1" />
                  </Button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
