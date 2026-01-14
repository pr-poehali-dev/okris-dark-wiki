import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

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
  full_description: string;
}

interface Law {
  id: string;
  title: string;
  type: 'constitution' | 'criminal' | 'civil' | 'economic';
  content: string;
  enacted_date: string;
}

interface Ministry {
  id: string;
  name: string;
  icon: string;
  minister: string;
  responsibilities: string[];
  budget: number;
}

interface Court {
  id: string;
  name: string;
  judges: string[];
  jurisdiction: string;
  cases_handled: number;
}

interface Ruler {
  nickname: string;
  title: string;
  role: 'monarch' | 'president' | 'chancellor' | 'council_member';
  term_start: string;
  term_end?: string;
  achievements: string[];
}

export default function NationDetail() {
  const { nationId } = useParams();
  const [nation, setNation] = useState<Nation | null>(null);
  const [laws, setLaws] = useState<Law[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [rulers, setRulers] = useState<Ruler[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNationData();
  }, [nationId]);

  const fetchNationData = async () => {
    try {
      const [nationRes, lawsRes, ministriesRes, courtsRes, rulersRes] = await Promise.all([
        fetch(`/api/nations/${nationId}`),
        fetch(`/api/nations/${nationId}/laws`),
        fetch(`/api/nations/${nationId}/ministries`),
        fetch(`/api/nations/${nationId}/courts`),
        fetch(`/api/nations/${nationId}/rulers`)
      ]);

      setNation(await nationRes.json());
      setLaws((await lawsRes.json()).laws || []);
      setMinistries((await ministriesRes.json()).ministries || []);
      setCourts((await courtsRes.json()).courts || []);
      setRulers((await rulersRes.json()).rulers || []);
    } catch (error) {
      console.error('Failed to fetch nation data:', error);
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const loadMockData = () => {
    setNation(mockNation);
    setLaws(mockLaws);
    setMinistries(mockMinistries);
    setCourts(mockCourts);
    setRulers(mockRulers);
  };

  const getLawTypeColor = (type: string) => {
    const colors = {
      constitution: 'bg-primary/20 text-primary border-primary/50',
      criminal: 'bg-destructive/20 text-destructive border-destructive/50',
      civil: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      economic: 'bg-gold-500/20 text-gold-500 border-gold-500/50'
    };
    return colors[type as keyof typeof colors] || colors.civil;
  };

  const getLawTypeLabel = (type: string) => {
    const labels = {
      constitution: 'Конституция',
      criminal: 'Уголовное право',
      civil: 'Гражданское право',
      economic: 'Экономическое право'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!nation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Государство не найдено</p>
          <Link to="/nations">
            <Button className="mt-4">Вернуться к списку</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link to="/nations">
              <Button variant="ghost" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                К государствам
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-start gap-6 mb-6">
              <div className="text-8xl">{nation.flag_emoji}</div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-glow">{nation.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{nation.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-base">
                    <Icon name="Building" size={16} className="mr-2" />
                    {nation.government_type}
                  </Badge>
                  <Badge variant="outline" className="text-base">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Основано: {new Date(nation.founded_date).toLocaleDateString('ru-RU')}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="Star" size={24} className="text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{nation.reputation}%</p>
                    <p className="text-sm text-muted-foreground">Репутация</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="Users" size={24} className="text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{nation.population}</p>
                    <p className="text-sm text-muted-foreground">Жителей</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="MapPin" size={24} className="text-secondary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{nation.territory_size}</p>
                    <p className="text-sm text-muted-foreground">Чанков</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="Building" size={24} className="text-accent mx-auto mb-2" />
                    <p className="text-lg font-bold">{nation.capital}</p>
                    <p className="text-sm text-muted-foreground">Столица</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">
                <Icon name="Info" size={16} className="mr-2" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="laws">
                <Icon name="Scale" size={16} className="mr-2" />
                Законы
              </TabsTrigger>
              <TabsTrigger value="government">
                <Icon name="Briefcase" size={16} className="mr-2" />
                Правительство
              </TabsTrigger>
              <TabsTrigger value="courts">
                <Icon name="Gavel" size={16} className="mr-2" />
                Суды
              </TabsTrigger>
              <TabsTrigger value="rulers">
                <Icon name="Crown" size={16} className="mr-2" />
                Правители
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>О государстве</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">{nation.full_description}</p>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Target" size={18} className="text-primary" />
                        Цели государства
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Развитие экономики и торговли</li>
                        <li>• Защита прав и свобод граждан</li>
                        <li>• Расширение территории</li>
                        <li>• Укрепление международных связей</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Award" size={18} className="text-primary" />
                        Достижения
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Крупнейшая торговая площадь сервера</li>
                        <li>• 3 успешных дипломатических договора</li>
                        <li>• Победа в турнире PvP 2025</li>
                        <li>• Самая развитая инфраструктура</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="laws">
              <div className="space-y-4">
                {laws.map((law, idx) => (
                  <Card 
                    key={law.id}
                    className="bg-card/50 backdrop-blur border-border/50 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{law.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getLawTypeColor(law.type)}>
                              {getLawTypeLabel(law.type)}
                            </Badge>
                            <Badge variant="outline">
                              <Icon name="Calendar" size={12} className="mr-1" />
                              {new Date(law.enacted_date).toLocaleDateString('ru-RU')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground whitespace-pre-line">{law.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="government">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ministries.map((ministry, idx) => (
                  <Card 
                    key={ministry.id}
                    className="bg-card/50 backdrop-blur border-border/50 animate-scale-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Icon name={ministry.icon as any} size={24} className="text-primary" />
                        {ministry.name}
                      </CardTitle>
                      <CardDescription>
                        Министр: <Link to={`/profile/${ministry.minister}`} className="text-primary hover:underline">{ministry.minister}</Link>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Обязанности:</h4>
                        <ul className="space-y-1">
                          {ministry.responsibilities.map((resp, respIdx) => (
                            <li key={respIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Icon name="Dot" size={14} className="shrink-0 mt-1" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-border/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Бюджет:</span>
                          <Badge variant="outline" className="text-accent">
                            {ministry.budget.toLocaleString()}💎
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courts">
              <div className="space-y-4">
                {courts.map((court, idx) => (
                  <Card 
                    key={court.id}
                    className="bg-card/50 backdrop-blur border-border/50 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Icon name="Gavel" size={24} className="text-primary" />
                        {court.name}
                      </CardTitle>
                      <CardDescription>{court.jurisdiction}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Судьи:</h4>
                        <div className="flex flex-wrap gap-2">
                          {court.judges.map((judge, judgeIdx) => (
                            <Link key={judgeIdx} to={`/profile/${judge}`}>
                              <Badge variant="outline" className="hover:border-primary/50 cursor-pointer">
                                <Icon name="User" size={12} className="mr-1" />
                                {judge}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-border/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Рассмотрено дел:</span>
                          <Badge variant="outline">{court.cases_handled}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rulers">
              <div className="space-y-4">
                {rulers.map((ruler, idx) => (
                  <Card 
                    key={idx}
                    className="bg-card/50 backdrop-blur border-border/50 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link to={`/profile/${ruler.nickname}`} className="hover:text-primary transition-colors">
                            <CardTitle className="text-2xl mb-1">{ruler.nickname}</CardTitle>
                          </Link>
                          <Badge className="bg-gold-500/20 text-gold-500 border-gold-500/50">
                            <Icon name="Crown" size={12} className="mr-1" />
                            {ruler.title}
                          </Badge>
                        </div>
                        <Icon name="User" size={32} className="text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Начало правления: {new Date(ruler.term_start).toLocaleDateString('ru-RU')}</span>
                        {ruler.term_end && (
                          <span>• Конец: {new Date(ruler.term_end).toLocaleDateString('ru-RU')}</span>
                        )}
                        {!ruler.term_end && (
                          <Badge variant="outline" className="bg-primary/20 text-primary">Действующий</Badge>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Достижения:</h4>
                        <ul className="space-y-1">
                          {ruler.achievements.map((achievement, achIdx) => (
                            <li key={achIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Icon name="Award" size={14} className="text-primary shrink-0 mt-1" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const mockNation: Nation = {
  id: 'emerald-kingdom',
  name: 'Изумрудное Королевство',
  flag_emoji: '🟢',
  description: 'Древнее королевство, основанное на торговле изумрудами',
  reputation: 92,
  population: 23,
  territory_size: 450,
  founded_date: '2025-06-15',
  capital: 'Эмеральдия',
  government_type: 'Конституционная монархия',
  status: 'active',
  full_description: 'Изумрудное Королевство — одно из старейших и наиболее процветающих государств на сервере Окрис. Основанное группой торговцев изумрудами, королевство быстро стало центром экономической активности благодаря своему стратегическому расположению и богатым месторождениям. Конституционная монархия обеспечивает баланс между традициями и современным управлением, что привлекает игроков со всего сервера.'
};

const mockLaws: Law[] = [
  {
    id: '1',
    title: 'Конституция Изумрудного Королевства',
    type: 'constitution',
    content: 'Статья 1. Основы государственного строя\nИзумрудное Королевство является конституционной монархией с демократическими институтами власти.\n\nСтатья 2. Права граждан\nВсе граждане королевства обладают равными правами независимо от времени вступления и вклада в развитие.\n\nСтатья 3. Разделение властей\nВласть в королевстве делится на исполнительную (монарх и министры), законодательную (парламент) и судебную (Королевский суд).',
    enacted_date: '2025-06-15'
  },
  {
    id: '2',
    title: 'Уголовный кодекс',
    type: 'criminal',
    content: 'Статья 1. Запрещается воровство имущества граждан. Наказание: возмещение ущерба в двойном размере.\n\nСтатья 2. Запрещено убийство граждан без ролевых причин. Наказание: изгнание на 7 дней.\n\nСтатья 3. Гриферство государственной собственности карается изгнанием на 30 дней.',
    enacted_date: '2025-06-20'
  },
  {
    id: '3',
    title: 'Экономический регламент',
    type: 'economic',
    content: 'Статья 1. Налогообложение\nВсе магазины на территории королевства платят налог 5% от оборота.\n\nСтатья 2. Торговля\nСвободная торговля разрешена во всех районах, кроме дворцовой площади.\n\nСтатья 3. Валюта\nОфициальной валютой являются алмазы и изумруды. Курс: 1 алмаз = 8 изумрудов.',
    enacted_date: '2025-07-01'
  }
];

const mockMinistries: Ministry[] = [
  {
    id: '1',
    name: 'Министерство экономики',
    icon: 'TrendingUp',
    minister: 'TradeKing',
    responsibilities: [
      'Управление казной государства',
      'Регулирование торговли',
      'Сбор налогов',
      'Экономическое планирование'
    ],
    budget: 15000
  },
  {
    id: '2',
    name: 'Министерство обороны',
    icon: 'Shield',
    minister: 'WarriorChief',
    responsibilities: [
      'Организация армии',
      'Защита границ',
      'Военные учения',
      'Снабжение армии'
    ],
    budget: 12000
  },
  {
    id: '3',
    name: 'Министерство строительства',
    icon: 'Hammer',
    minister: 'BuildMaster',
    responsibilities: [
      'Городское планирование',
      'Общественные постройки',
      'Инфраструктура',
      'Архитектурный надзор'
    ],
    budget: 10000
  },
  {
    id: '4',
    name: 'Министерство иностранных дел',
    icon: 'Globe',
    minister: 'Diplomat',
    responsibilities: [
      'Дипломатические отношения',
      'Международные договоры',
      'Торговые соглашения',
      'Посольства'
    ],
    budget: 8000
  }
];

const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Королевский верховный суд',
    judges: ['JusticeSeeker', 'LawKeeper', 'FairJudge'],
    jurisdiction: 'Рассмотрение всех категорий дел, апелляции',
    cases_handled: 47
  },
  {
    id: '2',
    name: 'Торговый суд',
    judges: ['MerchantJudge', 'TradeArbitrator'],
    jurisdiction: 'Споры в сфере торговли и экономики',
    cases_handled: 23
  }
];

const mockRulers: Ruler[] = [
  {
    nickname: 'EmeraldKing',
    title: 'Король Изумрудного Королевства',
    role: 'monarch',
    term_start: '2025-06-15',
    achievements: [
      'Основал королевство и привлёк 20+ игроков',
      'Построил крупнейший торговый центр сервера',
      'Заключил мирные договоры с 5 государствами',
      'Организовал 3 крупных события для сервера'
    ]
  }
];
