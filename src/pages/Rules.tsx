import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ruleCategories = [
  {
    id: 'general',
    title: 'Общие правила',
    icon: 'BookOpen',
    color: 'text-primary',
    rules: [
      {
        id: '1.1',
        text: 'Уважайте других игроков. Оскорбления, угрозы и токсичное поведение запрещены.',
        severity: 'critical'
      },
      {
        id: '1.2',
        text: 'Запрещено использование читов, модов и программ, дающих преимущество в игре.',
        severity: 'critical'
      },
      {
        id: '1.3',
        text: 'Гриферство и воровство без ролевой составляющей запрещено.',
        severity: 'high'
      },
      {
        id: '1.4',
        text: 'Используйте русский или английский язык в общем чате.',
        severity: 'medium'
      },
      {
        id: '1.5',
        text: 'Спам, флуд и реклама сторонних ресурсов запрещены.',
        severity: 'high'
      }
    ]
  },
  {
    id: 'building',
    title: 'Строительство',
    icon: 'Home',
    color: 'text-secondary',
    rules: [
      {
        id: '2.1',
        text: 'Стройте на расстоянии минимум 100 блоков от чужих построек без согласия владельца.',
        severity: 'high'
      },
      {
        id: '2.2',
        text: 'Запрещены постройки оскорбительного или непристойного содержания.',
        severity: 'critical'
      },
      {
        id: '2.3',
        text: 'Лагающие механизмы и фермы должны быть оптимизированы или выключены при просьбе администрации.',
        severity: 'medium'
      },
      {
        id: '2.4',
        text: 'Запрещено строить в спавн-зоне без разрешения администрации.',
        severity: 'high'
      }
    ]
  },
  {
    id: 'pvp',
    title: 'PvP и конфликты',
    icon: 'Swords',
    color: 'text-destructive',
    rules: [
      {
        id: '3.1',
        text: 'PvP разрешено только по обоюдному согласию или в рамках ролевых конфликтов.',
        severity: 'high'
      },
      {
        id: '3.2',
        text: 'Запрещено убийство новичков и игроков без снаряжения.',
        severity: 'high'
      },
      {
        id: '3.3',
        text: 'Кемперство и спаункилл запрещены.',
        severity: 'critical'
      },
      {
        id: '3.4',
        text: 'После смерти в PvP противник обязан вернуть часть вещей (если не оговорено иное).',
        severity: 'medium'
      }
    ]
  },
  {
    id: 'roleplay',
    title: 'Ролевая игра',
    icon: 'Drama',
    color: 'text-accent',
    rules: [
      {
        id: '4.1',
        text: 'Соблюдайте общий лор сервера при создании своих историй.',
        severity: 'medium'
      },
      {
        id: '4.2',
        text: 'Конфликты между государствами и группировками должны иметь ролевое обоснование.',
        severity: 'medium'
      },
      {
        id: '4.3',
        text: 'Запрещено использовать метагейминг (использование информации вне игры).',
        severity: 'high'
      },
      {
        id: '4.4',
        text: 'Крупные ролевые события должны быть согласованы с администрацией.',
        severity: 'low'
      }
    ]
  },
  {
    id: 'economy',
    title: 'Экономика',
    icon: 'Coins',
    color: 'text-gold-500',
    rules: [
      {
        id: '5.1',
        text: 'Мошенничество в торговле запрещено.',
        severity: 'critical'
      },
      {
        id: '5.2',
        text: 'Дюпы и эксплойты для получения ресурсов запрещены.',
        severity: 'critical'
      },
      {
        id: '5.3',
        text: 'Магазины должны иметь четкие цены и условия торговли.',
        severity: 'low'
      }
    ]
  }
];

const severityConfig = {
  critical: { label: 'Бан', color: 'bg-destructive text-destructive-foreground' },
  high: { label: 'Строго', color: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
  medium: { label: 'Варн', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
  low: { label: 'Рекомендация', color: 'bg-muted text-muted-foreground' }
};

export default function Rules() {
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              <Icon name="Scale" size={40} className="inline mr-3 text-primary" />
              Правила сервера
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Соблюдение правил обеспечивает комфортную игру для всех участников сообщества.
              Незнание правил не освобождает от ответственности.
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur border-primary/50 mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertCircle" size={24} className="text-primary" />
                Важная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                <Icon name="Check" size={16} className="inline text-primary mr-2" />
                Администрация имеет право наказать за действия, не описанные в правилах, если они наносят вред серверу
              </p>
              <p className="text-foreground">
                <Icon name="Check" size={16} className="inline text-primary mr-2" />
                При повторных нарушениях наказание усиливается
              </p>
              <p className="text-foreground">
                <Icon name="Check" size={16} className="inline text-primary mr-2" />
                Апелляции можно подать в Discord в течение 7 дней с момента наказания
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {ruleCategories.map((category, idx) => (
              <Card 
                key={category.id}
                className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon name={category.icon as any} size={28} className={category.color} />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.rules.map((rule, ruleIdx) => (
                      <div key={rule.id}>
                        {ruleIdx > 0 && <Separator className="my-4" />}
                        <div className="flex items-start gap-4">
                          <Badge variant="outline" className="mt-1 shrink-0">
                            {rule.id}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-foreground mb-2">{rule.text}</p>
                            <Badge className={severityConfig[rule.severity].color}>
                              {severityConfig[rule.severity].label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card/50 backdrop-blur border-border/50 mt-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MessageCircle" size={24} className="text-primary" />
                Вопросы по правилам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Если у вас остались вопросы по правилам или вы хотите сообщить о нарушении, 
                свяжитесь с администрацией через Discord или используйте команду /report в игре.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contacts">
                  <Button variant="outline">
                    <Icon name="Mail" size={16} className="mr-2" />
                    Контакты
                  </Button>
                </Link>
                <Link to="/wiki">
                  <Button variant="outline">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    База знаний
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
