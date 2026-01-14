import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const contactMethods = [
  {
    id: 'discord',
    title: 'Discord сервер',
    description: 'Основная площадка общения сообщества',
    icon: 'MessageCircle',
    color: 'text-blue-400',
    link: 'https://discord.gg/okris',
    linkText: 'discord.gg/okris',
    features: ['Быстрая поддержка', 'Общение с игроками', 'Новости и события', 'Подача апелляций']
  },
  {
    id: 'telegram',
    title: 'Telegram канал',
    description: 'Новости и важные объявления',
    icon: 'Send',
    color: 'text-blue-500',
    link: 'https://t.me/okrismc',
    linkText: '@okrismc',
    features: ['Анонсы обновлений', 'Технические работы', 'События и конкурсы']
  },
  {
    id: 'email',
    title: 'Email',
    description: 'Для официальных обращений',
    icon: 'Mail',
    color: 'text-primary',
    link: 'mailto:support@okris.ru',
    linkText: 'support@okris.ru',
    features: ['Жалобы на игроков', 'Предложения', 'Технические вопросы', 'Партнёрство']
  },
  {
    id: 'vk',
    title: 'ВКонтакте',
    description: 'Сообщество в VK',
    icon: 'Users',
    color: 'text-blue-600',
    link: 'https://vk.com/okrismc',
    linkText: 'vk.com/okrismc',
    features: ['Галерея построек', 'Истории игроков', 'Конкурсы']
  }
];

const teamMembers = [
  {
    nickname: 'DarkMage',
    role: 'Владелец и главный администратор',
    roleColor: 'text-primary',
    responsibilities: ['Управление проектом', 'Разработка лора', 'Техническая часть'],
    contact: 'Discord: DarkMage#1337'
  },
  {
    nickname: 'ShadowKeeper',
    role: 'Администратор',
    roleColor: 'text-destructive',
    responsibilities: ['Модерация', 'События', 'Работа с сообществом'],
    contact: 'Discord: ShadowKeeper#9999'
  },
  {
    nickname: 'RuneWriter',
    role: 'Куратор лора',
    roleColor: 'text-secondary',
    responsibilities: ['Развитие истории', 'Ролевые события', 'Проверка анкет'],
    contact: 'Discord: RuneWriter#4242'
  },
  {
    nickname: 'BlockBuilder',
    role: 'Технический специалист',
    roleColor: 'text-accent',
    responsibilities: ['Плагины', 'Карта', 'Оптимизация'],
    contact: 'Discord: BlockBuilder#7777'
  }
];

export default function Contacts() {
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              <Icon name="Phone" size={40} className="inline mr-3 text-primary" />
              Контакты
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, idx) => (
              <Card 
                key={method.id}
                className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all animate-scale-in group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name={method.icon as any} size={28} className={method.color} />
                    {method.title}
                  </CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a 
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full group-hover:border-primary/50">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      {method.linkText}
                    </Button>
                  </a>
                  <div className="space-y-2">
                    {method.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={14} className="text-primary shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card/50 backdrop-blur border-border/50 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Icon name="Users" size={28} className="text-primary" />
                Команда проекта
              </CardTitle>
              <CardDescription>
                Познакомьтесь с теми, кто делает Окрис особенным
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map((member, idx) => (
                  <div 
                    key={member.nickname}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{member.nickname}</h3>
                        <Badge variant="outline" className={`mt-1 ${member.roleColor}`}>
                          {member.role}
                        </Badge>
                      </div>
                      <Icon name="User" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-muted-foreground">Обязанности:</p>
                      {member.responsibilities.map((resp, respIdx) => (
                        <div key={respIdx} className="flex items-center gap-2 text-sm">
                          <Icon name="Dot" size={14} className="text-primary shrink-0" />
                          {resp}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-primary">{member.contact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={24} className="text-primary" />
                  Время ответа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="Zap" size={18} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Discord</p>
                    <p className="text-sm text-muted-foreground">В течение 1-2 часов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Send" size={18} className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Telegram</p>
                    <p className="text-sm text-muted-foreground">В течение 2-4 часов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={18} className="text-accent mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">В течение 24 часов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="HelpCircle" size={24} className="text-primary" />
                  Часто задаваемые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/wiki" className="block p-3 rounded border border-border/50 hover:border-primary/50 transition-all">
                  <p className="font-medium flex items-center gap-2">
                    <Icon name="BookOpen" size={16} className="text-primary" />
                    База знаний
                  </p>
                  <p className="text-sm text-muted-foreground">Гайды и инструкции</p>
                </Link>
                <Link to="/rules" className="block p-3 rounded border border-border/50 hover:border-primary/50 transition-all">
                  <p className="font-medium flex items-center gap-2">
                    <Icon name="Scale" size={16} className="text-primary" />
                    Правила сервера
                  </p>
                  <p className="text-sm text-muted-foreground">Все правила в одном месте</p>
                </Link>
                <Link to="/lore" className="block p-3 rounded border border-border/50 hover:border-primary/50 transition-all">
                  <p className="font-medium flex items-center gap-2">
                    <Icon name="Scroll" size={16} className="text-primary" />
                    Лор сервера
                  </p>
                  <p className="text-sm text-muted-foreground">История мира Окрис</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
