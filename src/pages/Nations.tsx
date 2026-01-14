import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Nation {
  id: string;
  name: string;
  flag_emoji: string;
  description: string;
  reputation: number;
  population: number;
  territory_size: number;
  founded_date: string;
  capital: string;
  government_type: string;
  status: 'active' | 'inactive' | 'war';
}

export default function Nations() {
  const [nations, setNations] = useState<Nation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNations();
  }, []);

  const fetchNations = async () => {
    try {
      const response = await fetch('/api/nations');
      const data = await response.json();
      setNations(data.nations || []);
    } catch (error) {
      console.error('Failed to fetch nations:', error);
      setNations(mockNations);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNations = nations.filter(nation =>
    nation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getReputationColor = (reputation: number) => {
    if (reputation >= 80) return 'text-primary';
    if (reputation >= 60) return 'text-blue-400';
    if (reputation >= 40) return 'text-yellow-400';
    if (reputation >= 20) return 'text-orange-400';
    return 'text-destructive';
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: 'Активно', color: 'bg-primary/20 text-primary border-primary/50' },
      inactive: { label: 'Неактивно', color: 'bg-muted text-muted-foreground' },
      war: { label: 'Война', color: 'bg-destructive/20 text-destructive border-destructive/50' }
    };
    return config[status as keyof typeof config] || config.active;
  };

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
              <Button variant="ghost" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-glow">
                <Icon name="Flag" size={40} className="inline mr-3 text-primary" />
                Государства
              </h1>
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                TESTING
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Признанные государства мира Окрис. Создайте своё государство или вступите в существующее!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск государства..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="box-glow">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать государство
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Загрузка государств...</p>
            </div>
          ) : filteredNations.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="py-12 text-center">
                <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Государства не найдены</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNations.map((nation, idx) => (
                <Link key={nation.id} to={`/nations/${nation.id}`}>
                  <Card 
                    className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer group animate-scale-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-5xl">{nation.flag_emoji}</div>
                        <Badge className={getStatusBadge(nation.status).color}>
                          {getStatusBadge(nation.status).label}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {nation.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {nation.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Репутация</p>
                          <div className="flex items-center gap-2">
                            <Icon name="Star" size={16} className={getReputationColor(nation.reputation)} />
                            <span className={`font-semibold ${getReputationColor(nation.reputation)}`}>
                              {nation.reputation}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Жителей</p>
                          <div className="flex items-center gap-2">
                            <Icon name="Users" size={16} className="text-primary" />
                            <span className="font-semibold">{nation.population}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Территория</p>
                          <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} className="text-secondary" />
                            <span className="font-semibold">{nation.territory_size} чанков</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Столица</p>
                          <div className="flex items-center gap-2">
                            <Icon name="Building" size={16} className="text-accent" />
                            <span className="font-semibold text-sm">{nation.capital}</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-border/50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{nation.government_type}</span>
                          <span className="text-muted-foreground">
                            Основано: {new Date(nation.founded_date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <Card className="bg-card/50 backdrop-blur border-primary/50 mt-12 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={24} className="text-primary" />
                Как создать государство?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Соберите минимум 5 игроков, готовых стать жителями
              </p>
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Захватите и обустройте территорию размером минимум 100 чанков
              </p>
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Создайте конституцию и законы государства
              </p>
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Подайте заявку администрации через Discord для признания
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const mockNations: Nation[] = [
  {
    id: 'emerald-kingdom',
    name: 'Изумрудное Королевство',
    flag_emoji: '🟢',
    description: 'Древнее королевство, основанное на торговле изумрудами. Центр экономики сервера.',
    reputation: 92,
    population: 23,
    territory_size: 450,
    founded_date: '2025-06-15',
    capital: 'Эмеральдия',
    government_type: 'Конституционная монархия',
    status: 'active'
  },
  {
    id: 'shadow-empire',
    name: 'Империя Теней',
    flag_emoji: '🟣',
    description: 'Таинственная империя, практикующая древнюю магию. Известна своими алхимиками.',
    reputation: 68,
    population: 18,
    territory_size: 380,
    founded_date: '2025-07-22',
    capital: 'Обсидия',
    government_type: 'Теократия',
    status: 'active'
  },
  {
    id: 'free-republic',
    name: 'Вольная Республика',
    flag_emoji: '🔵',
    description: 'Демократическое государство, основанное на свободе и равенстве. Открыто для всех.',
    reputation: 85,
    population: 31,
    territory_size: 520,
    founded_date: '2025-05-10',
    capital: 'Либерум',
    government_type: 'Демократическая республика',
    status: 'active'
  },
  {
    id: 'northern-alliance',
    name: 'Северный Альянс',
    flag_emoji: '⚪',
    description: 'Союз северных городов, специализирующихся на добыче ресурсов.',
    reputation: 73,
    population: 15,
    territory_size: 290,
    founded_date: '2025-08-05',
    capital: 'Фростхейм',
    government_type: 'Конфедерация',
    status: 'active'
  },
  {
    id: 'desert-sultanate',
    name: 'Пустынный Султанат',
    flag_emoji: '🟡',
    description: 'Богатое государство в пустынных землях. Славится архитектурой и караванными путями.',
    reputation: 79,
    population: 12,
    territory_size: 340,
    founded_date: '2025-07-18',
    capital: 'Золотой Оазис',
    government_type: 'Абсолютная монархия',
    status: 'active'
  },
  {
    id: 'iron-legion',
    name: 'Железный Легион',
    flag_emoji: '🔴',
    description: 'Военизированное государство с сильной армией. В данный момент в состоянии войны.',
    reputation: 45,
    population: 20,
    territory_size: 410,
    founded_date: '2025-06-30',
    capital: 'Стальград',
    government_type: 'Военная хунта',
    status: 'war'
  }
];
