import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const mockServerData = {
  online: 47,
  maxPlayers: 100,
  tps: 19.8,
  season: 'Сезон III: Тени Забытых'
};

const mockNews = [
  {
    id: 1,
    title: 'Обновление 3.2: Врата Древних',
    date: '10 января 2026',
    excerpt: 'Открыты новые локации для исследования. Таинственные врата появились на границах известного мира...'
  },
  {
    id: 2,
    title: 'Событие: Ночь Кровавой Луны',
    date: '5 января 2026',
    excerpt: 'Особое событие начнётся 15 января. Приготовьтесь к встрече с древним злом...'
  },
  {
    id: 3,
    title: 'Итоги Сезона II',
    date: '28 декабря 2025',
    excerpt: 'Подведены итоги прошедшего сезона. Поздравляем победителей и благодарим всех участников!'
  }
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/lore" className="text-muted-foreground hover:text-primary transition-colors">
                Лор
              </Link>
              <Link to="/wiki" className="text-muted-foreground hover:text-primary transition-colors">
                Вики
              </Link>
              <Link to="/map" className="text-muted-foreground hover:text-primary transition-colors">
                Карта
              </Link>
              <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                Магазин
              </Link>
              <Link to="/online" className="text-muted-foreground hover:text-primary transition-colors">
                Онлайн
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <Icon name="User" size={16} className="mr-2" />
                  Войти
                </Button>
              </Link>
              <Button size="sm" className="box-glow">
                <Icon name="Play" size={16} className="mr-2" />
                Играть
              </Button>
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-fade-in">
              <Link to="/" className="block py-2 text-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/lore" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
                Лор
              </Link>
              <Link to="/wiki" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
                Вики
              </Link>
              <Link to="/map" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
                Карта
              </Link>
              <Link to="/shop" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
                Магазин
              </Link>
              <Link to="/online" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
                Онлайн
              </Link>
              <div className="pt-2 space-y-2">
                <Link to="/auth" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="User" size={16} className="mr-2" />
                    Войти
                  </Button>
                </Link>
                <Button size="sm" className="w-full box-glow">
                  <Icon name="Play" size={16} className="mr-2" />
                  Играть
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-glow">
              Добро пожаловать в <span className="text-primary">Окрис</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Погрузитесь в мир тайн и загадок. Исследуйте древние руины, раскрывайте секреты и 
              пишите свою историю в ванильном Minecraft с уникальным лором.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg box-glow">
                <Icon name="Gamepad2" size={20} className="mr-2" />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Узнать лор
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                  Онлайн игроков
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{mockServerData.online}/{mockServerData.maxPlayers}</div>
                <Badge variant="outline" className="mt-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse mr-2"></span>
                  Сервер онлайн
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-secondary/50 transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Zap" size={20} className="text-secondary" />
                  Производительность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">{mockServerData.tps} TPS</div>
                <Badge variant="outline" className="mt-2 border-secondary/50">
                  Отличная
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-all animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Calendar" size={20} className="text-accent" />
                  Текущий сезон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-accent">{mockServerData.season}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">Высокая</div>
                <Badge variant="outline" className="mt-2">
                  +12% за неделю
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <Icon name="Newspaper" size={32} className="inline mr-3 text-primary" />
              Последние новости
            </h2>
            <div className="space-y-6">
              {mockNews.map((news, index) => (
                <Card 
                  key={news.id} 
                  className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {news.title}
                      </CardTitle>
                      <Badge variant="outline">{news.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{news.excerpt}</p>
                    <Button variant="link" className="px-0 mt-2 text-primary">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Castle" size={20} className="text-primary" />
                Окрис
              </h3>
              <p className="text-muted-foreground">
                Ванильный Minecraft сервер с уникальным лором и атмосферой таинственности.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ссылки</h4>
              <div className="space-y-2">
                <Link to="/rules" className="block text-muted-foreground hover:text-primary transition-colors">
                  Правила сервера
                </Link>
                <Link to="/contacts" className="block text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
                <Link to="/donate" className="block text-muted-foreground hover:text-primary transition-colors">
                  Поддержать проект
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Сообщество</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Youtube" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Github" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground">
            <p>&copy; 2026 Окрис. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
