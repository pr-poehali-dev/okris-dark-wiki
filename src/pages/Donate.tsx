import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const donationGoal = {
  current: 28750,
  target: 50000,
  currency: '₽'
};

const serverCosts = [
  { item: 'Хостинг сервера (VDS)', cost: 15000, period: 'в месяц' },
  { item: 'Защита от DDoS', cost: 8000, period: 'в месяц' },
  { item: 'Домен и SSL', cost: 2000, period: 'в месяц' },
  { item: 'Разработка и поддержка', cost: 20000, period: 'в месяц' },
  { item: 'Резервное копирование', cost: 5000, period: 'в месяц' }
];

const benefits = [
  {
    id: 'vip',
    title: 'VIP статус',
    price: 199,
    color: 'text-blue-400',
    icon: 'Star',
    features: [
      'Цветной ник в чате',
      'Приоритет входа на сервер',
      '2 дополнительных региона',
      'Доступ к /hat',
      'Возможность выбора цвета ника'
    ],
    duration: '30 дней'
  },
  {
    id: 'premium',
    title: 'Premium статус',
    price: 399,
    color: 'text-gold-500',
    icon: 'Crown',
    features: [
      'Всё из VIP',
      'Уникальный префикс в чате',
      '5 дополнительных регионов',
      'Доступ к /fly в своих регионах',
      'Возможность создавать варпы',
      'Особая роль в Discord'
    ],
    duration: '30 дней',
    popular: true
  },
  {
    id: 'legend',
    title: 'Legend статус',
    price: 799,
    color: 'text-purple-600',
    icon: 'Sparkles',
    features: [
      'Всё из Premium',
      'Эксклюзивный анимированный префикс',
      '10 дополнительных регионов',
      'Доступ к /fly везде',
      'Собственный кит',
      'Голосование за события',
      'Доступ к бета-тестированию'
    ],
    duration: '30 дней'
  }
];

const topDonators = [
  { nickname: 'EmeraldKnight', amount: 15000, badge: 'Легенда проекта' },
  { nickname: 'ShadowMaster', amount: 12500, badge: 'Покровитель' },
  { nickname: 'MysticRune', amount: 10000, badge: 'Благодетель' },
  { nickname: 'DarkPhoenix', amount: 8500, badge: 'Меценат' },
  { nickname: 'CrystalSage', amount: 7200, badge: 'Спонсор' }
];

export default function Donate() {
  const [amount, setAmount] = useState('500');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const progress = (donationGoal.current / donationGoal.target) * 100;

  const handleQuickAmount = (value: string) => {
    setAmount(value);
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              <Icon name="Heart" size={40} className="inline mr-3 text-primary" />
              Поддержать проект
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ваша поддержка помогает нам развивать сервер и создавать новый контент.
              Спасибо за вклад в развитие Окриса!
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur border-primary/50 mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Icon name="Target" size={28} className="text-primary" />
                Цель месяца: Новое оборудование
              </CardTitle>
              <CardDescription>
                Собираем на улучшение сервера для лучшей производительности
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-primary">
                    {donationGoal.current.toLocaleString()} {donationGoal.currency}
                  </span>
                  <span className="text-muted-foreground">
                    из {donationGoal.target.toLocaleString()} {donationGoal.currency}
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Собрано {progress.toFixed(1)}% от цели
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, idx) => (
              <Card 
                key={benefit.id}
                className={`bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all animate-scale-in relative ${
                  benefit.popular ? 'border-primary/50 shadow-lg shadow-primary/20' : ''
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {benefit.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Популярный выбор
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-card flex items-center justify-center border-2 border-current ${benefit.color}`}>
                      <Icon name={benefit.icon as any} size={32} />
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">{benefit.title}</CardTitle>
                  <CardDescription className="text-center">
                    <span className="text-3xl font-bold text-foreground">{benefit.price}₽</span>
                    <span className="text-muted-foreground"> / {benefit.duration}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {benefit.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/shop?highlight=${benefit.id}`}>
                    <Button 
                      className="w-full box-glow"
                      variant={benefit.popular ? 'default' : 'outline'}
                    >
                      Приобрести
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gift" size={24} className="text-primary" />
                  Свободное пожертвование
                </CardTitle>
                <CardDescription>
                  Поддержите проект любой суммой без привилегий
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Сумма пожертвования</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Введите сумму"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['100', '300', '500', '1000'].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(value)}
                      className={amount === value ? 'border-primary' : ''}
                    >
                      {value}₽
                    </Button>
                  ))}
                </div>
                <div className="space-y-3">
                  <Label>Способ оплаты</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <Icon name="CreditCard" size={16} />
                        Банковская карта
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sbp" id="sbp" />
                      <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer">
                        <Icon name="Smartphone" size={16} />
                        СБП (Система быстрых платежей)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yoomoney" id="yoomoney" />
                      <Label htmlFor="yoomoney" className="flex items-center gap-2 cursor-pointer">
                        <Icon name="Wallet" size={16} />
                        ЮMoney
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button className="w-full box-glow">
                  <Icon name="Heart" size={16} className="mr-2" />
                  Поддержать проект
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="DollarSign" size={24} className="text-primary" />
                  Куда идут деньги?
                </CardTitle>
                <CardDescription>
                  Полная прозрачность расходов проекта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serverCosts.map((cost, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded border border-border/50"
                    >
                      <div>
                        <p className="font-medium">{cost.item}</p>
                        <p className="text-xs text-muted-foreground">{cost.period}</p>
                      </div>
                      <Badge variant="outline">{cost.cost.toLocaleString()}₽</Badge>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between font-bold">
                      <span>Итого в месяц:</span>
                      <span className="text-primary text-xl">
                        {serverCosts.reduce((sum, item) => sum + item.cost, 0).toLocaleString()}₽
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Trophy" size={24} className="text-primary" />
                Топ благотворителей
              </CardTitle>
              <CardDescription>
                Спасибо тем, кто делает проект лучше!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topDonators.map((donator, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-4 rounded border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold
                        ${idx === 0 ? 'bg-gold-500/20 text-gold-500' : ''}
                        ${idx === 1 ? 'bg-gray-400/20 text-gray-400' : ''}
                        ${idx === 2 ? 'bg-orange-600/20 text-orange-600' : ''}
                        ${idx > 2 ? 'bg-muted text-muted-foreground' : ''}
                      `}>
                        {idx + 1}
                      </div>
                      <div>
                        <Link to={`/profile/${donator.nickname}`} className="font-semibold hover:text-primary transition-colors">
                          {donator.nickname}
                        </Link>
                        <p className="text-sm text-muted-foreground">{donator.badge}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-primary">
                      {donator.amount.toLocaleString()}₽
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/50 mt-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={24} className="text-primary" />
                Важная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Все средства идут только на развитие и поддержку проекта
              </p>
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Пожертвования не являются платой за услуги и не подлежат возврату
              </p>
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                Привилегии активируются автоматически после оплаты
              </p>
              <p className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary shrink-0 mt-1" />
                При возникновении проблем обращайтесь в поддержку через Discord
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
