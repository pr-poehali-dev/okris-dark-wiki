import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const loreSeasons = [
  {
    id: 'season1',
    title: 'Сезон I: Весна Пробуждения',
    period: 'Март - Июнь 2024',
    status: 'completed',
    story: `В начале времён, когда мир был лишь пустошью и тишиной, первые странники ступили на земли Окрис. Никто не помнит, откуда они пришли — память стёрта туманом забвения. Лишь древние руны на границах мира шепчут о том, что было До.

Странники нашли руины — колоссальные структуры, уходящие глубоко под землю. Стены покрыты символами, которые невозможно прочесть, но которые вызывают странное чувство узнавания. Будто эти знаки всегда были частью тебя.

В центре мира обнаружен Обелиск — чёрная башня, излучающая слабое изумрудное свечение. Те, кто подходят слишком близко, слышат шёпот. Не слова — скорее эмоции, образы. Обещания силы. Предупреждения об опасности.`,
    discoveries: [
      'Древний Обелиск в центре мира',
      'Руины подземного города на глубине Y=12',
      'Алтарь с неизвестной механикой активации',
      'Фрагменты карты, указывающие на "Врата"'
    ],
    mysteries: [
      'Кто построил руины и почему они заброшены?',
      'Что скрывается за шёпотом Обелиска?',
      'Куда ведут фрагменты карты?'
    ],
    image: '/placeholder.svg'
  },
  {
    id: 'season2',
    title: 'Сезон II: Лето Раскола',
    period: 'Июль - Октябрь 2024',
    status: 'completed',
    story: `Активация Алтаря изменила всё. Земля содрогнулась, и из недр поднялись новые структуры — Врата. Массивные арки из обсидиана и неизвестного светящегося камня. Трое смельчаков вошли первыми.

Они вернулись изменёнными. В их глазах — знание, которого не должно быть у смертных. Они говорили о "Другой стороне" — месте, где время течёт иначе, где законы мира искажены. Там они видели Хранителей — существ из чистой энергии, которые следят за равновесием.

Но их возвращение принесло раскол. Часть общины хотела закрыть Врата навсегда. Другие — исследовать дальше. Началась война не оружием, а идеями. Некоторые странники исчезли, войдя во Врата и не вернувшись. На карте появились новые руины — или это они всегда были там, просто невидимы?`,
    discoveries: [
      'Три Врата в разных биомах мира',
      'Записи "изменённых" о Хранителях',
      'Кристаллы памяти — предметы, показывающие видения',
      'Разлом под Обелиском — портал в подземелье'
    ],
    mysteries: [
      'Что случилось с исчезнувшими игроками?',
      'Кто такие Хранители и в чём их цель?',
      'Правда ли, что мир — это тюрьма?'
    ],
    image: '/placeholder.svg'
  },
  {
    id: 'season3',
    title: 'Сезон III: Осень Тёмных Шёпотов',
    period: 'Ноябрь 2024 - Февраль 2025',
    status: 'completed',
    story: `Шёпот усилился. Теперь его слышат все — даже те, кто никогда не подходил к Обелиску. Сны стали общими: странники видят один и тот же кошмар — город, поглощённый тьмой, и фигуру в капюшоне, протягивающую руку.

В подземелье под Разломом обнаружена библиотека. Тысячи книг на неизвестном языке, но некоторые страницы читаемы. Там написано о "Цикле" — мир уничтожается и возрождается снова и снова. Окрис — это не первая итерация. И каждый раз Хранители стирают память, оставляя лишь руины как предупреждение.

Фигура из снов появилась наяву. Назвала себя Эхом. Сказала, что Хранители лгут, что Цикл можно разорвать. Но для этого нужно сделать выбор: принять тьму или остаться в вечном забвении.`,
    discoveries: [
      'Библиотека Забытых — подземное хранилище знаний',
      'Записи о предыдущих итерациях мира',
      'Явление Эха — сущности из снов',
      'Механизм под Обелиском — "Разрыватель Цикла"'
    ],
    mysteries: [
      'Кто такое Эхо и можно ли ему доверять?',
      'Что произойдёт, если активировать Разрыватель?',
      'Есть ли способ вспомнить прошлые жизни?'
    ],
    image: '/placeholder.svg'
  },
  {
    id: 'season4',
    title: 'Сезон IV: Зима Последнего Выбора',
    period: 'Март 2025 - Настоящее время',
    status: 'active',
    story: `Мир на грани. Хранители активировали защитный протокол — структуры начали исчезать, биомы меняются, время ускоряется. У игроков есть выбор.

Путь Света: Помочь Хранителям завершить Цикл "правильно" — принять забвение, но сохранить мир для следующей итерации.

Путь Тьмы: Активировать Разрыватель вместе с Эхом — разорвать Цикл, но никто не знает, что будет после. Хранители предупреждают: это может уничтожить реальность.

Путь Равновесия: Найден третий вариант — древний ритуал, который позволит сохранить память через Циклы. Но для него нужны артефакты из всех трёх Врат, а туда невозможно войти без жертвы.

Конец близок. Что выберет Окрис?`,
    discoveries: [
      'Три артефакта Врат частично собраны',
      'Ритуал Вечной Памяти — инструкция найдена',
      'Хранители начали материализацию в мире',
      'Эхо открыло доступ к "Истинному Окрис"'
    ],
    mysteries: [
      'Успеют ли игроки выполнить ритуал?',
      'Что такое "Истинный Окрис"?',
      'Кто из NPC — реальные игроки прошлых Циклов?'
    ],
    image: '/placeholder.svg'
  }
];

export default function Lore() {
  const [selectedSeason, setSelectedSeason] = useState('season1');

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
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-glow">
              <Icon name="BookOpen" size={48} className="inline mr-4 text-primary" />
              Лор Окрис
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Погрузитесь в эпическую историю мира, где каждый сезон раскрывает новые тайны, 
              а каждое открытие игроков меняет ход повествования.
            </p>
          </div>

          <Tabs value={selectedSeason} onValueChange={setSelectedSeason} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent">
              {loreSeasons.map((season) => (
                <TabsTrigger
                  key={season.id}
                  value={season.id}
                  className="data-[state=active]:bg-primary/20 data-[state=active]:border-primary border border-transparent flex-col h-auto py-3 px-2"
                >
                  <div className="font-bold text-sm">{season.title.split(':')[0]}</div>
                  <div className="text-xs text-muted-foreground mt-1">{season.period}</div>
                  {season.status === 'active' && (
                    <Badge className="mt-2 bg-primary/20 text-primary border-primary">Активен</Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {loreSeasons.map((season) => (
              <TabsContent key={season.id} value={season.id} className="space-y-6 animate-fade-in">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-3xl mb-2">{season.title}</CardTitle>
                        <CardDescription className="text-base">{season.period}</CardDescription>
                      </div>
                      {season.status === 'active' && (
                        <Badge className="bg-primary/20 text-primary border-primary">
                          <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse mr-2"></span>
                          Текущий сезон
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                      {season.story.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-foreground/90 leading-relaxed mb-4 text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon name="Search" size={24} className="text-primary" />
                        Открытия игроков
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {season.discoveries.map((discovery, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/80">
                            <Icon name="Check" size={18} className="text-primary mt-1 flex-shrink-0" />
                            <span>{discovery}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur border-secondary/30 hover:border-secondary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon name="HelpCircle" size={24} className="text-secondary" />
                        Нераскрытые тайны
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {season.mysteries.map((mystery, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/80">
                            <Icon name="AlertCircle" size={18} className="text-secondary mt-1 flex-shrink-0" />
                            <span>{mystery}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {season.status === 'active' && (
                  <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Sparkles" size={24} className="text-accent" />
                        Станьте частью истории
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 mb-4">
                        Текущий сезон всё ещё развивается. Ваши действия в игре напрямую влияют на лор. 
                        Каждое открытие, каждое решение — часть общей истории Окрис.
                      </p>
                      <Link to="/auth">
                        <Button className="box-glow">
                          <Icon name="Play" size={18} className="mr-2" />
                          Присоединиться к приключению
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-12 bg-card/50 backdrop-blur border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Users" size={28} className="text-primary" />
                Часто задаваемые вопросы о лоре
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="q1" className="border-border/50">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    Можно ли влиять на развитие лора?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 text-base">
                    Да! Лор Окрис развивается на основе действий игроков. Крупные открытия, постройки и события 
                    в игре интегрируются в официальную историю мира. Администрация следит за активностью и 
                    добавляет важные моменты в повествование каждого сезона.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-border/50">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    Что происходит между сезонами?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 text-base">
                    Каждый сезон — это глава в общей истории. Мир не стирается полностью, но может претерпевать 
                    изменения в зависимости от выбора игроков. Некоторые структуры остаются как памятники прошлых 
                    событий, другие исчезают, оставляя лишь легенды.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="border-border/50">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    Есть ли скрытые секреты в текущем сезоне?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 text-base">
                    Определённо! Не всё, что происходит в мире, сразу попадает на сайт. Многие тайны ждут своего 
                    открытия. Общайтесь с другими игроками, исследуйте мир и обращайте внимание на детали — 
                    ключи к разгадкам часто скрыты на виду.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
