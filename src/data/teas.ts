export interface Tea {
  id: number;
  name: string;
  type: string;
  country: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
}

export const teaTypes = ["Все сорта", "Зелёный", "Чёрный", "Белый", "Улун", "Пуэр"];
export const countries = ["Все страны", "Китай", "Япония", "Индия", "Тайвань", "Шри-Ланка"];

export const teas: Tea[] = [
  {
    id: 1,
    name: "Серебряные иглы",
    type: "Белый",
    country: "Китай",
    price: 3200,
    description: "Редчайший белый чай из провинции Фуцзянь. Собирается только весной, вручную.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    name: "Те Гуань Инь",
    type: "Улун",
    country: "Китай",
    price: 2800,
    description: "Легендарный улун с орхидейным ароматом. Сложный, многогранный вкус.",
    image: "https://images.unsplash.com/photo-1594631661960-097f9025f821?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: 3,
    name: "Гёкуро",
    type: "Зелёный",
    country: "Япония",
    price: 4500,
    description: "Премиальный японский зелёный чай. Выращен в тени, богат аминокислотами.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: 4,
    name: "Дарджилинг Первый сбор",
    type: "Чёрный",
    country: "Индия",
    price: 2400,
    description: "Шампанское среди чаёв. Лёгкий, цветочный, с мускатными нотами.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Шен Пуэр 2015",
    type: "Пуэр",
    country: "Китай",
    price: 5200,
    description: "Выдержанный пуэр из древних деревьев. Глубокий, землистый вкус.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Лунцзин Императорский",
    type: "Зелёный",
    country: "Китай",
    price: 3800,
    description: "Колодец дракона — один из десяти великих чаёв Китая. Орехово-сладкий.",
    image: "https://images.unsplash.com/photo-1563822249366-3a5f1f2e2854?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Сенча Фукамуши",
    type: "Зелёный",
    country: "Япония",
    price: 1900,
    description: "Глубоко пропаренная сенча. Насыщенный зелёный цвет, богатый вкус.",
    image: "https://images.unsplash.com/photo-1536493696332-181c8c724c2d?w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Восточная красавица",
    type: "Улун",
    country: "Тайвань",
    price: 3400,
    description: "Тайваньский улун с медовым ароматом. Естественная сладость.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop"
  }
];
