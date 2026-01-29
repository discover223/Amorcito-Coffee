import { Plus, Coffee as CoffeeIcon, Croissant, IceCreamCone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cartStore';
import { toast } from 'sonner';
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'drink' | 'pastry' | 'iced-latte';
}
const menuItems: MenuItem[] = [
// Specialty Iced Latte
{
  id: 'iced-mazapan-latte',
  name: 'Iced Mazapan Latte',
  price: 6.00,
  description: 'Mazapan Bliss',
  category: 'drink'
}, {
  id: 'Iced-Cookie-Butter-latte',
  name: 'Iced Cookie Butter Latte',
  price: 6.00,
  description: 'Cookie Dream',
  category: 'drink'
}, {
  id: 'iced-brown-sugar-shaken-latte',
  name: 'Iced Brown Sugar Shaken Latte',
  price: 6.00,
  description: 'Brown Sugar Delight',
  category: 'drink'
}, {
  id: 'strawberr-matcha',
  name: 'Strawberry Matcha',
  price: 7.00,
  description: 'Berry Freshness',
  category: 'drink'
},
// Simple Iced Lattes
{
  id: 'iced-vanilla-latte',
  name: 'Iced Vanilla Latte',
  price: 6.00,
  description: 'Vanilla and creamy',
  category: 'iced-latte'
}, {
  id: 'iced-caramel-latte',
  name: 'Iced Caramel Latte',
  price: 6.00,
  description: 'Sweet caramel swirl',
  category: 'iced-latte'
}, {
  id: 'iced-matcha-latte',
  name: 'Iced Matcha Latte',
  price: 6.00,
  description: 'Matcha Magic',
  category: 'iced-latte'
}, {
  id: 'iced-hazelnut-latte',
  name: 'Iced Hazelnut Latte',
  price: 6.00,
  description: 'Nutty and smooth',
  category: 'iced-latte'
}, {
  id: 'iced-banana-latte',
  name: 'Iced Banana Latte',
  price: 6.00,
  description: 'Banana Cream',
  category: 'iced-latte'
}, {
  id: 'iced-banana-matcha',
  name: 'Iced Banana Matcha',
  price: 6.00,
  description: 'Banana Matcha Fusion',
  category: 'iced-latte'
},
// Pastries
{
  id: 'almond-croissant',
  name: 'Almond Croissant',
  price: 6.00,
  description: 'Almond Crunch',
  category: 'pastry'
}, {
  id: 'chocolate-croissant',
  name: 'Chocolate Croissant',
  price: 6.00,
  description: 'Choco Bliss',
  category: 'pastry'
}, {
  id: 'cookie-butter-crossaint',
  name: 'Cookie Butter Crossaint',
  price: 6.00,
  description: 'Cookie Butter Delight',
  category: 'pastry'
}, {
  id: 'tres-leches-slice',
  name: 'Tres Leches Slice',
  price: 6.00,
  description: 'Cake Dream',
  category: 'pastry'
}, {
  id: 'amorcillo-parfait',
  name: 'Amorcillo Parfait',
  price: 6.00,
  description: 'Layered Sweetness',
  category: 'pastry'
}];
const MenuSection = () => {
  const addItem = useCart(state => state.addItem);
  const drinks = menuItems.filter(item => item.category === 'drink');
  const icedLattes = menuItems.filter(item => item.category === 'iced-latte');
  const pastries = menuItems.filter(item => item.category === 'pastry');
  const handleAddItem = (item: MenuItem) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`, {
      description: 'View your cart to checkout.',
      duration: 2000
    });
  };
  return <section id="menu" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-brown-light uppercase tracking-wider mb-4">
            Our Menu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-6">
            Simple, Fresh & Full of Heart
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            All drinks can be made with either oat, almond, or wholemilk          
          </p>
        </div>

        {/* Drinks Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <CoffeeIcon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-accent">Specialty Iced Latte </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drinks.map(item => <div key={item.id} className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 flex items-center justify-between group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-accent">{item.name}</h4>
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <Button size="icon" variant="warm" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => handleAddItem(item)} aria-label={`Add ${item.name} to cart`}>
                  <Plus className="w-5 h-5" />
                </Button>
              </div>)}
          </div>
        </div>

        {/* Simple Iced Lattes Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <IceCreamCone className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-accent">Simple Iced Lattes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {icedLattes.map(item => <div key={item.id} className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 flex items-center justify-between group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-accent">{item.name}</h4>
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <Button size="icon" variant="warm" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => handleAddItem(item)} aria-label={`Add ${item.name} to cart`}>
                  <Plus className="w-5 h-5" />
                </Button>
              </div>)}
          </div>
        </div>

        {/* Pastries Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Croissant className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-accent">Pastries</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastries.map(item => <div key={item.id} className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 flex items-center justify-between group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-accent">{item.name}</h4>
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <Button size="icon" variant="warm" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => handleAddItem(item)} aria-label={`Add ${item.name} to cart`}>
                  <Plus className="w-5 h-5" />
                </Button>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default MenuSection;