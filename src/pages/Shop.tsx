import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const shopCategories = {
  pass: [
    {
      id: 'whitelist',
      name: 'Проходка',
      price: 199,
      description: 'Доступ на сервер Окрис. Разовая покупка без ограничений по времени.',
      features: [
        'Бессрочный доступ на сервер',
        'Участие во всех событиях',
        'Доступ к базовым командам',
        'Место в Discord-сообществе'
      ],
      popular: true,
      icon: 'Key'
    }
  ],
  privileges: [
    {
      id: 'vip',
      name: 'VIP',
      price: 399,
      description: 'Базовая привилегия с полезными возможностями',
      features: [
        '5 точек /home',
        'Цветной ник в чате',
        'Приоритет входа на сервер',
        '/fly в своём регионе',
        'Доступ к /kit vip'
      ],
      icon: 'Star'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 799,
      description: 'Расширенная привилегия для комфортной игры',
      features: [
        'Всё из VIP',
        '10 точек /home',
        '/fly везде',
        'Доступ к /kit premium',
        'Возможность установки префикса',
        'Скидка 10% в магазине'
      ],
      popular: true,
      icon: 'Crown'
    },
    {
      id: 'legend',
      name: 'Legend',
      price: 1499,
      description: 'Максимальная привилегия для истинных легенд',
      features: [
        'Всё из Premium',
        'Безлимит точек /home',
        'Уникальный титул "Легенда"',
        'Доступ к /kit legend',
        'Персональный цвет ника',
        'Скидка 20% в магазине',
        'Приоритетная поддержка'
      ],
      icon: 'Sparkles'
    }
  ],
  cosmetics: [
    {
      id: 'particle-heart',
      name: 'Эффект частиц "Сердца"',
      price: 149,
      description: 'Красивые частицы сердечек вокруг персонажа',
      icon: 'Heart'
    },
    {
      id: 'particle-magic',
      name: 'Эффект частиц "Магия"',
      price: 149,
      description: 'Мистические фиолетовые частицы',
      icon: 'Sparkles'
    },
    {
      id: 'pet-wolf',
      name: 'Питомец "Волк"',
      price: 299,
      description: 'Косметический питомец-волк, следующий за вами',
      icon: 'Dog'
    }
  ],
  resources: [
    {
      id: 'starter-pack',
      name: 'Стартовый набор',
      price: 99,
      description: 'Базовый набор ресурсов для новичков',
      features: [
        '64 древесины',
        '32 факела',
        '16 еды',
        'Железная кирка'
      ],
      icon: 'Package'
    },
    {
      id: 'builder-pack',
      name: 'Набор строителя',
      price: 249,
      description: 'Ресурсы для масштабных построек',
      features: [
        '10 стаков различных блоков',
        'Инструменты с Эффективностью III',
        '64 факела',
        'Бонус: 5000 игровой валюты'
      ],
      icon: 'Hammer'
    }
  ],
  services: [
    {
      id: 'rename',
      name: 'Переименование предмета',
      price: 49,
      description: 'Изменить название любого предмета с цветом',
      icon: 'Edit'
    },
    {
      id: 'tp-home',
      name: 'Перенос дома',
      price: 99,
      description: 'Администратор перенесёт вашу постройку в другое место',
      icon: 'Home'
    },
    {
      id: 'region',
      name: 'Расширение региона',
      price: 199,
      description: 'Увеличить размер вашего приватного региона на 50x50',
      icon: 'Maximize'
    }
  ]
};

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { toast } = useToast();
  
  const highlightProduct = searchParams.get('highlight');

  useEffect(() => {
    if (highlightProduct === 'whitelist') {
      const element = document.getElementById('product-whitelist');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
      }
    }
  }, [highlightProduct]);

  const handleBuy = (product: any) => {
    setSelectedProduct(product);
    setIsPaymentOpen(true);
  };

  const handlePayment = () => {
    toast({
      title: "Переход к оплате",
      description: `Откроется окно оплаты для "${selectedProduct.name}"`,
    });
    setIsPaymentOpen(false);
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
              <Button variant="outline" size="sm">
                <Icon name="Home" size={16} className="mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-glow">
              <Icon name="ShoppingCart" size={48} className="inline mr-4 text-primary" />
              Магазин
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Поддержите проект и получите уникальные возможности на сервере
            </p>
          </div>

          <Tabs defaultValue="pass" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent">
              <TabsTrigger value="pass" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Key" size={18} className="mr-2" />
                Проходка
              </TabsTrigger>
              <TabsTrigger value="privileges" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Crown" size={18} className="mr-2" />
                Привилегии
              </TabsTrigger>
              <TabsTrigger value="cosmetics" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Sparkles" size={18} className="mr-2" />
                Косметика
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Package" size={18} className="mr-2" />
                Наборы
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Wrench" size={18} className="mr-2" />
                Услуги
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pass" className="animate-fade-in">
              <div className="grid gap-6 max-w-2xl mx-auto">
                {shopCategories.pass.map((product) => (
                  <Card
                    key={product.id}
                    id={`product-${product.id}`}
                    className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50 relative overflow-hidden transition-all"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
                            <Icon name={product.icon as any} size={32} className="text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-3xl">{product.name}</CardTitle>
                            <CardDescription className="text-base mt-1">{product.description}</CardDescription>
                          </div>
                        </div>
                        {product.popular && (
                          <Badge className="bg-accent/20 text-accent border-accent">Рекомендуем</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/90">
                            <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                          <div className="text-4xl font-bold text-primary">{product.price} ₽</div>
                          <div className="text-sm text-muted-foreground">Разовая покупка</div>
                        </div>
                        <Button size="lg" className="box-glow" onClick={() => handleBuy(product)}>
                          <Icon name="ShoppingBag" size={20} className="mr-2" />
                          Купить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="privileges" className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopCategories.privileges.map((product) => (
                  <Card
                    key={product.id}
                    className={`bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all relative ${
                      product.popular ? 'ring-2 ring-primary/30' : ''
                    }`}
                  >
                    {product.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Популярно</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4 border border-primary/50">
                        <Icon name={product.icon as any} size={28} className="text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 min-h-[200px]">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                            <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-border/50">
                        <div className="text-3xl font-bold text-primary mb-4">{product.price} ₽</div>
                        <Button className="w-full" onClick={() => handleBuy(product)}>
                          <Icon name="ShoppingBag" size={18} className="mr-2" />
                          Купить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cosmetics" className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopCategories.cosmetics.map((product) => (
                  <Card key={product.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-secondary/50 transition-all">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 border border-secondary/50">
                        <Icon name={product.icon as any} size={28} className="text-secondary" />
                      </div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-2xl font-bold text-secondary">{product.price} ₽</div>
                      <Button className="w-full" variant="outline" onClick={() => handleBuy(product)}>
                        <Icon name="ShoppingBag" size={18} className="mr-2" />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {shopCategories.resources.map((product) => (
                  <Card key={product.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-all">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4 border border-accent/50">
                        <Icon name={product.icon as any} size={28} className="text-accent" />
                      </div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.features && (
                        <ul className="space-y-2 mb-4">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="text-2xl font-bold text-accent">{product.price} ₽</div>
                        <Button onClick={() => handleBuy(product)}>
                          <Icon name="ShoppingBag" size={18} className="mr-2" />
                          Купить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopCategories.services.map((product) => (
                  <Card key={product.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4 border border-primary/50">
                        <Icon name={product.icon as any} size={28} className="text-primary" />
                      </div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-2xl font-bold text-primary">{product.price} ₽</div>
                      <Button className="w-full" variant="outline" onClick={() => handleBuy(product)}>
                        <Icon name="ShoppingBag" size={18} className="mr-2" />
                        Заказать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="bg-card/95 backdrop-blur border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="CreditCard" size={28} className="text-primary" />
              Оформление покупки
            </DialogTitle>
            <DialogDescription>
              Вы покупаете: <span className="font-semibold text-foreground">{selectedProduct?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <span className="text-lg">Итого к оплате:</span>
              <span className="text-3xl font-bold text-primary">{selectedProduct?.price} ₽</span>
            </div>
            <div className="space-y-3">
              <Button className="w-full h-12 text-base box-glow" onClick={handlePayment}>
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оплатить картой (ЮKassa)
              </Button>
              <Button className="w-full h-12 text-base" variant="outline" onClick={handlePayment}>
                <Icon name="Smartphone" size={20} className="mr-2" />
                Оплатить через SBP
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              После оплаты товар будет автоматически активирован на вашем аккаунте
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
