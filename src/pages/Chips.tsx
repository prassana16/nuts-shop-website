import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Truck, Shield, Award, ChevronRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MixedImg from "@/assets/mixed.png";

// chips product list: basePrice is price per 100g
const chipsProducts = [
  { id: 1, name: "LAY'S CLASSIC", basePrice: 35, description: "Classic salted potato chips", image: MixedImg },
  { id: 2, name: "CHEESE BALLS", basePrice: 40, description: "Cheesy crunchy bites", image: MixedImg },
  { id: 3, name: "KETTLE SALT", basePrice: 45, description: "Kettle cooked salt chips", image: MixedImg },
  { id: 4, name: "SWEET CHILLI", basePrice: 38, description: "Sweet chilli flavored chips", image: MixedImg },
  { id: 5, name: "BBQ", basePrice: 40, description: "Barbecue flavored chips", image: MixedImg },
  { id: 6, name: "SOUR CREAM & ONION", basePrice: 42, description: "Sour cream & onion", image: MixedImg },
  { id: 7, name: "PERI PERI", basePrice: 44, description: "Peri peri spicy chips", image: MixedImg },
  { id: 8, name: "MEXICAN", basePrice: 39, description: "Mexican spicy mix", image: MixedImg },
  { id: 9, name: "MASALA", basePrice: 36, description: "Indian masala chips", image: MixedImg },
  { id: 10, name: "PLAIN SALT", basePrice: 30, description: "Plain salted chips", image: MixedImg },
];

const features = [
  { icon: Truck, title: "Fresh Stock", description: "Regularly replenished for crunch" },
  { icon: Shield, title: "Quality","description":"Sourced from trusted brands" },
  { icon: Award, title: "Tasty Varieties", description: "Flavors for every mood" },
];

const Chips = () => {
  const [selectedGrams, setSelectedGrams] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  const setGramsFor = (productId: number, grams: number) => {
    setSelectedGrams((prev) => ({ ...prev, [productId]: grams }));
  };

  const getPrice = (product: any, grams?: number) => {
    const g = grams || 100;
    return Math.round(product.basePrice * (g / 100));
  };

  const contactWhatsApp = (productId: number) => {
    const product = chipsProducts.find((p) => p.id === productId)!;
    const grams = selectedGrams[product.id] || 100;
    const price = getPrice(product, grams);
    const msg = `Hello, I'm interested in ${product.name} - ${grams}g (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 via-amber-50/20 to-white">
      <Navbar />

  <section className="py-12 px-4 mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Crispy Chips Collection</h2>
          <p className="text-slate-600">A curated selection of crunchy chips and snacks</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chipsProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-amber-200 relative">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart className={`h-5 w-5 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 relative">
                <div className="w-full h-full flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="max-w-3/4 max-h-3/4 object-contain" />
                  ) : (
                    <div className="text-8xl">🍟</div>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{product.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">₹{getPrice(product, selectedGrams[product.id] || 100)}</span>
                  <span className="text-sm text-slate-500">/{(selectedGrams[product.id] || 100) >= 1000 ? `${(selectedGrams[product.id] || 100)/1000}kg` : `${selectedGrams[product.id] || 100}g`}</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                <div className="flex items-center gap-2 w-full flex-wrap">
                  {[100,200,250,500,1000].map((g) => {
                    const isSelected = (selectedGrams[product.id] || 100) === g;
                    return (
                      <Button key={g} variant={isSelected ? undefined : 'outline'} onClick={() => setGramsFor(product.id, g)} className={`h-10 px-3 rounded-full text-sm font-semibold ${isSelected ? 'bg-amber-600 text-white' : ''}`}>
                        {g >= 1000 ? `${g/1000}kg` : `${g}g`}
                      </Button>
                    );
                  })}
                </div>

                <Button onClick={() => contactWhatsApp(product.id)} className="w-full rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Phone className="mr-2 h-4 w-4" /> Contact WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chips;
