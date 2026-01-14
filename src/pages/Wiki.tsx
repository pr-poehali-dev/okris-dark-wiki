import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const wikiCategories = {
  plugins: [
    {
      id: 'teleport',
      name: 'Система телепортации',
      description: 'Кастомная система точек телепортации и домов',
      commands: [
        { cmd: '/sethome [название]', desc: 'Установить точку дома (макс. 3)' },
        { cmd: '/home [название]', desc: 'Телепортироваться домой' },
        { cmd: '/delhome [название]', desc: 'Удалить точку дома' },
        { cmd: '/homes', desc: 'Список ваших домов' }
      ]
    },
    {
      id: 'economy',
      name: 'Экономика',
      description: 'Внутриигровая валюта и торговля',
      commands: [
        { cmd: '/balance', desc: 'Проверить баланс' },
        { cmd: '/pay [игрок] [сумма]', desc: 'Передать деньги игроку' },
        { cmd: '/shop', desc: 'Открыть магазин сервера' }
      ]
    }
  ],
  crafts: [
    {
      name: 'Кристалл Телепортации',
      ingredients: [
        { item: 'Эндер-жемчуг', count: 4 },
        { item: 'Аметистовый осколок', count: 8 },
        { item: 'Светопыль', count: 2 }
      ],
      result: 'Кристалл Телепортации x1',
      description: 'Позволяет телепортироваться к союзникам раз в час'
    },
    {
      name: 'Руна Защиты',
      ingredients: [
        { item: 'Обсидиан', count: 8 },
        { item: 'Незеритовый слиток', count: 1 },
        { item: 'Тотем бессмертия', count: 1 }
      ],
      result: 'Руна Защиты x1',
      description: 'Создаёт защитное поле вокруг игрока на 30 секунд'
    },
    {
      name: 'Эссенция Памяти',
      ingredients: [
        { item: 'Осколок эха', count: 4 },
        { item: 'Зачарованная книга', count: 1 },
        { item: 'Бутылочка опыта', count: 16 }
      ],
      result: 'Эссенция Памяти x1',
      description: 'Сохраняет опыт при смерти (одноразовый предмет)'
    }
  ],
  mechanics: [
    {
      name: 'Система репутации',
      description: 'Выполняйте задания NPC и повышайте репутацию с фракциями мира. Высокая репутация даёт доступ к уникальным крафтам и локациям.',
      details: [
        'Репутация изменяется от -1000 до +1000',
        'Ранги: Враг, Нейтрал, Друг, Союзник, Легенда',
        'Каждый ранг открывает новые квесты и награды'
      ]
    },
    {
      name: 'Древние руины',
      description: 'Подземные структуры с сокровищами и опасностями. Обновляются каждую неделю.',
      details: [
        'Генерируются на глубине Y: -40 до Y: 10',
        'Содержат сундуки с редкими предметами',
        'Охраняются кастомными мобами',
        'Карта руин продаётся у Картографа'
      ]
    }
  ],
  mobs: [
    {
      name: 'Призрак Забытых',
      health: '40 HP',
      damage: '8-12',
      spawn: 'Древние руины (ночью)',
      drops: ['Осколок эха (40%)', 'Древняя монета (15%)', 'Эссенция душ (5%)'],
      behavior: 'Телепортируется за спину игрока. Невидим при свете дня.'
    },
    {
      name: 'Хранитель Обелиска',
      health: '200 HP',
      damage: '15-20',
      spawn: 'Центр мира (у Обелиска)',
      drops: ['Фрагмент Обелиска (100%)', 'Незеритовый слиток (50%)', 'Тотем бессмертия (10%)'],
      behavior: 'Призывает миньонов каждые 30 секунд. Регенерирует здоровье вне боя.'
    }
  ],
  economy: {
    earnMoney: [
      'Продажа ресурсов в /shop',
      'Выполнение ежедневных заданий',
      'Участие в серверных событиях',
      'Продажа кастомных предметов другим игрокам',
      'Нахождение древних монет в руинах'
    ],
    prices: [
      { item: 'Алмаз', buy: 50, sell: 30 },
      { item: 'Незеритовый слиток', buy: 500, sell: 350 },
      { item: 'Эндер-жемчуг', buy: 20, sell: 12 },
      { item: 'Древняя монета', buy: '—', sell: 100 }
    ]
  }
};

export default function Wiki() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('plugins');

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-glow">
              <Icon name="Book" size={48} className="inline mr-4 text-primary" />
              База знаний
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Полный справочник по механикам, плагинам, крафтам и экономике сервера Окрис
            </p>
          </div>

          <Card className="mb-8 bg-card/50 backdrop-blur border-border/50 animate-scale-in">
            <CardContent className="pt-6">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по вики... (например: 'телепортация', 'крафт', 'руны')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent">
              <TabsTrigger value="plugins" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Puzzle" size={18} className="mr-2" />
                Плагины
              </TabsTrigger>
              <TabsTrigger value="crafts" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Hammer" size={18} className="mr-2" />
                Крафты
              </TabsTrigger>
              <TabsTrigger value="mechanics" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Cog" size={18} className="mr-2" />
                Механики
              </TabsTrigger>
              <TabsTrigger value="mobs" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Skull" size={18} className="mr-2" />
                Мобы
              </TabsTrigger>
              <TabsTrigger value="economy" className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent py-3">
                <Icon name="Coins" size={18} className="mr-2" />
                Экономика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plugins" className="space-y-6 animate-fade-in">
              {wikiCategories.plugins.map((plugin) => (
                <Card key={plugin.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="Zap" size={24} className="text-primary" />
                      {plugin.name}
                    </CardTitle>
                    <CardDescription className="text-base">{plugin.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {plugin.commands.map((cmd, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 p-3 rounded-lg bg-muted/50">
                          <code className="text-primary font-mono text-sm bg-background/50 px-3 py-1 rounded">{cmd.cmd}</code>
                          <span className="text-muted-foreground">—</span>
                          <span className="text-foreground/80">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="crafts" className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {wikiCategories.crafts.map((craft, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Sparkles" size={24} className="text-accent" />
                        {craft.name}
                      </CardTitle>
                      <CardDescription>{craft.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Ингредиенты:</h4>
                        <div className="space-y-2">
                          {craft.ingredients.map((ing, i) => (
                            <div key={i} className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                              <span>{ing.item}</span>
                              <Badge variant="outline">×{ing.count}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <Icon name="ArrowRight" size={20} className="text-primary" />
                          <span className="font-semibold text-primary">{craft.result}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mechanics" className="space-y-6 animate-fade-in">
              {wikiCategories.mechanics.map((mechanic, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="Settings" size={24} className="text-secondary" />
                      {mechanic.name}
                    </CardTitle>
                    <CardDescription className="text-base">{mechanic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mechanic.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-foreground/80">
                          <Icon name="Check" size={18} className="text-primary mt-1 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="mobs" className="space-y-6 animate-fade-in">
              {wikiCategories.mobs.map((mob, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur border-destructive/30 hover:border-destructive/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="Skull" size={24} className="text-destructive" />
                      {mob.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Здоровье</div>
                        <div className="font-semibold text-destructive">{mob.health}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Урон</div>
                        <div className="font-semibold text-destructive">{mob.damage}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Спавн</div>
                        <div className="font-semibold">{mob.spawn}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Поведение:</div>
                      <p className="text-foreground/80">{mob.behavior}</p>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Дроп:</div>
                      <div className="flex flex-wrap gap-2">
                        {mob.drops.map((drop, i) => (
                          <Badge key={i} variant="outline" className="border-primary/50">
                            {drop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="economy" className="space-y-6 animate-fade-in">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} className="text-accent" />
                    Как заработать деньги
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {wikiCategories.economy.earnMoney.map((method, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80 text-base">
                        <Icon name="Coins" size={20} className="text-accent mt-1 flex-shrink-0" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="BarChart" size={24} className="text-primary" />
                    Цены базовых ресурсов
                  </CardTitle>
                  <CardDescription>Актуальные цены серверного магазина</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Предмет</TableHead>
                        <TableHead className="text-right">Покупка</TableHead>
                        <TableHead className="text-right">Продажа</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wikiCategories.economy.prices.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{item.item}</TableCell>
                          <TableCell className="text-right text-primary">{item.buy} ₽</TableCell>
                          <TableCell className="text-right text-secondary">{item.sell} ₽</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
