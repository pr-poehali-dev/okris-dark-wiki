import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationsEnabled?: boolean;
}

export function ApplicationDialog({ open, onOpenChange, applicationsEnabled = true }: ApplicationDialogProps) {
  const [choice, setChoice] = useState<'application' | 'buy' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setTimeout(() => setChoice(null), 200);
    }
  };

  const [formData, setFormData] = useState({
    minecraft_nickname: '',
    age: '',
    experience: '',
    about: '',
    motivation: '',
    rules_accepted: false
  });

  const handleBuy = () => {
    navigate('/shop?highlight=whitelist');
    onOpenChange(false);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Анкета отправлена!",
        description: "Ваша заявка принята на рассмотрение. Ожидайте ответа в течение 24 часов.",
      });
      onOpenChange(false);
      setChoice(null);
      setFormData({
        minecraft_nickname: '',
        age: '',
        experience: '',
        about: '',
        motivation: '',
        rules_accepted: false
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        {!choice ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl flex items-center gap-2">
                <Icon name="Gamepad2" size={32} className="text-primary" />
                Присоединиться к Окрис
              </DialogTitle>
              <DialogDescription className="text-base">
                Выберите способ получения доступа на сервер
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4 py-6">
              {applicationsEnabled && (
                <button
                  onClick={() => setChoice('application')}
                  className="p-6 rounded-lg border-2 border-border hover:border-primary transition-all text-left space-y-4 bg-card/50 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:bg-primary/30 transition-colors">
                    <Icon name="FileText" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Заполнить анкету</h3>
                    <p className="text-muted-foreground text-sm">
                      Бесплатный способ. Расскажите о себе и получите доступ после проверки модератором.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Icon name="Clock" size={16} />
                    <span>Рассмотрение до 24 часов</span>
                  </div>
                </button>
              )}

              {!applicationsEnabled && (
                <div className="p-6 rounded-lg border-2 border-border opacity-50 text-left space-y-4 bg-card/30">
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name="FileX" size={28} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Анкеты закрыты</h3>
                    <p className="text-muted-foreground text-sm">
                      На данный момент подача анкет временно приостановлена администрацией.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setChoice('buy')}
                className="p-6 rounded-lg border-2 border-border hover:border-accent transition-all text-left space-y-4 bg-gradient-to-br from-accent/10 to-primary/10 group"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/50 group-hover:bg-accent/30 transition-colors">
                  <Icon name="ShoppingCart" size={28} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Купить проходку</h3>
                  <p className="text-muted-foreground text-sm">
                    Моментальный доступ без ожидания. Поддержите проект и начните играть сразу.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-accent">199 ₽</span>
                  <span className="text-sm text-muted-foreground">/ навсегда</span>
                </div>
              </button>
            </div>
          </>
        ) : choice === 'buy' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Icon name="ShoppingCart" size={28} className="text-accent" />
                Покупка проходки
              </DialogTitle>
              <DialogDescription>
                Вы будете перенаправлены в магазин для оформления покупки
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 space-y-6">
              <div className="p-6 rounded-lg bg-accent/10 border border-accent/30 space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="Check" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Что входит в проходку:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Бессрочный доступ на сервер</li>
                      <li>• Участие во всех событиях</li>
                      <li>• Доступ к базовым командам</li>
                      <li>• Место в Discord-сообществе</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span className="text-lg">Итого:</span>
                <span className="text-3xl font-bold text-accent">199 ₽</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setChoice(null)}>
                  Назад
                </Button>
                <Button className="flex-1 box-glow" onClick={handleBuy}>
                  <Icon name="ArrowRight" size={18} className="mr-2" />
                  Перейти к оплате
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Icon name="FileText" size={28} className="text-primary" />
                Анкета на проходку
              </DialogTitle>
              <DialogDescription>
                Заполните форму максимально честно и подробно
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitApplication} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">Ваш никнейм в Minecraft *</Label>
                <Input
                  id="nickname"
                  value={formData.minecraft_nickname}
                  onChange={(e) => setFormData({ ...formData, minecraft_nickname: e.target.value })}
                  placeholder="Steve"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Ваш возраст *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="16"
                  min="10"
                  max="99"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Опыт игры в Minecraft *</Label>
                <RadioGroup
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="font-normal cursor-pointer">
                      Новичок (менее года)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="font-normal cursor-pointer">
                      Средний уровень (1-3 года)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="font-normal cursor-pointer">
                      Опытный игрок (более 3 лет)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">Расскажите о себе *</Label>
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="Чем вы увлекаетесь, какой у вас стиль игры..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Почему вы хотите играть на Окрис? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Что вас привлекло в нашем сервере..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 p-4 rounded-lg bg-muted/50">
                <input
                  type="checkbox"
                  id="rules"
                  checked={formData.rules_accepted}
                  onChange={(e) => setFormData({ ...formData, rules_accepted: e.target.checked })}
                  required
                  className="w-4 h-4"
                />
                <Label htmlFor="rules" className="text-sm font-normal cursor-pointer">
                  Я ознакомился с правилами сервера и обязуюсь их соблюдать
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setChoice(null)}>
                  Назад
                </Button>
                <Button type="submit" className="flex-1 box-glow" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить анкету
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}