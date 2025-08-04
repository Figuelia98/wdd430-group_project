"use client";

import { useState, useEffect } from "react";
import {
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

// Database interfaces
interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  seller: {
    _id: string;
    name: string;
    businessName?: string;
  };
  averageRating: number;
  totalReviews: number;
  isFeatured: boolean;
}

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const categories = [
  {
    name: "New Arrivals",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-01.jpg",
  },
  {
    name: "Productivity",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-02.jpg",
  },
  {
    name: "Workspace",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-04.jpg",
  },
  {
    name: "Accessories",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-05.jpg",
  },
  {
    name: "Sale",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-03.jpg",
  },
];
const collections = [
  {
    name: "Handcrafted Collection",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-01.jpg",
    imageAlt:
      "Brown leather key ring with brass metal loops and rivets on wood table.",
    description:
      "Keep your phone, keys, and wallet together, so you can lose everything at once.",
  },
  {
    name: "Organized Desk Collection",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-02.jpg",
    imageAlt:
      "Natural leather mouse pad on white desk next to porcelain mug and keyboard.",
    description:
      "The rest of the house will still be a mess, but your desk will look great.",
  },
  {
    name: "Focus Collection",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-03.jpg",
    imageAlt:
      "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
    description:
      "Be more productive than enterprise project managers with a single piece of paper.",
  },
];
const footerNavigation = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Jewelry & Accessories", href: "/products?category=jewelry-accessories" },
    { name: "Home & Living", href: "/products?category=home-living" },
    { name: "Art & Collectibles", href: "/products?category=art-collectibles" },
    { name: "Featured Items", href: "/products?featured=true" },
  ],
  company: [
    { name: "About Handcrafted Haven", href: "/about" },
    { name: "Our Artisans", href: "/artisans" },
    { name: "Quality Promise", href: "/quality-promise" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  account: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/contact" },
    { name: "Returns & Exchanges", href: "/returns" },
  ],
  connect: [
    { name: "Contact Us", href: "/contact" },
    { name: "Facebook", href: "https://facebook.com/handcraftedhaven" },
    { name: "Instagram", href: "https://instagram.com/handcraftedhaven" },
    { name: "Pinterest", href: "https://pinterest.com/handcraftedhaven" },
  ],
};

export default function Example() {
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories from database
      const categoriesResponse = await fetch('/api/categories');
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setDbCategories(categoriesData.categories.slice(0, 5)); // Show first 5 categories
      }

      // Fetch featured products
      const productsResponse = await fetch('/api/products?featured=true&limit=6');
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setFeaturedProducts(productsData.products);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white">
      <Navigation />
      {/* Mobile menu - handled by Navigation component */}

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            className="size-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        {/* Navigation */}
        <header className="relative z-10">
          <nav aria-label="Top">
            {/* Top navigation */}
            <div className="bg-gray-900">
              <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Currency selector */}
                <form>
                  <div className="-ml-2 inline-grid grid-cols-1">
                    <select
                      id="desktop-currency"
                      name="currency"
                      aria-label="Currency"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-900 py-0.5 pr-7 pl-2 text-left text-base font-medium text-white focus:outline-2 focus:-outline-offset-1 focus:outline-white sm:text-sm/6"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-gray-300"
                    />
                  </div>
                </form>


              </div>
            </div>

            {/* Secondary navigation */}
            <div className="bg-white/10 backdrop-blur-md backdrop-filter">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                  <div className="flex h-16 items-center justify-between">
                    {/* Logo handled by Navigation component */}

                    {/* Navigation handled by Navigation component */}

                    {/* Logo handled by Navigation component */}

                    <div className="flex flex-1 items-center justify-end">
                      <a
                        href="#"
                        className="hidden text-sm font-medium text-white lg:block"
                      >
                        Search
                      </a>

                      <div className="flex items-center lg:ml-8">
                        {/* Help */}
                        <a href="#" className="p-2 text-white lg:hidden">
                          <span className="sr-only">Help</span>
                          <QuestionMarkCircleIcon
                            aria-hidden="true"
                            className="size-6"
                          />
                        </a>
                        <a
                          href="#"
                          className="hidden text-sm font-medium text-white lg:block"
                        >
                          Help
                        </a>

                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-8">
                          <a
                            href="#"
                            className="group -m-2 flex items-center p-2"
                          >
                            <ShoppingBagIcon
                              aria-hidden="true"
                              className="size-6 shrink-0 text-white"
                            />
                            <span className="ml-2 text-sm font-medium text-white">
                              0
                            </span>
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Welcome to Handcrafted Haven
          </h1>
          <p className="mt-4 text-xl text-white">
            Discover unique, handmade treasures from talented artisans around the world.
            Every piece tells a story, every purchase supports a creator.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Shop Handcrafted Items
            </Link>
            {!user && (
              <Link
                href="/register"
                className="inline-block rounded-md border-2 border-white px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-gray-900"
              >
                Join as Artisan
              </Link>
            )}
            {user?.role === 'seller' && (
              <Link
                href="/seller/profile"
                className="inline-block rounded-md border-2 border-white px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-gray-900"
              >
                Seller Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Shop by Category
            </h2>
            <Link
              href="/products"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all products
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {loading ? (
                    // Loading placeholder
                    Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 xl:w-auto bg-gray-200 animate-pulse"
                      >
                        <div className="relative mt-auto text-center text-xl font-bold text-gray-400">
                          Loading...
                        </div>
                      </div>
                    ))
                  ) : (
                    dbCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/products?category=${category.slug}`}
                        className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                      >
                        <span aria-hidden="true" className="absolute inset-0">
                          {category.image ? (
                            <img
                              alt={category.name}
                              src={category.image}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="size-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                          )}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                        />
                        <span className="relative mt-auto text-center text-xl font-bold text-white">
                          {category.name}
                        </span>
                        {category.description && (
                          <span className="relative text-center text-sm text-gray-200 mt-2">
                            {category.description}
                          </span>
                        )}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <Link
              href="/products"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all products
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="social-impact-heading"
          className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                className="size-full object-cover"
              />
            </div>
            <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="social-impact-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  <span className="block sm:inline">Support</span>
                  <span className="block sm:inline">Local Artisans</span>
                </h2>
                <p className="mt-3 text-xl text-white">
                  Every purchase directly supports independent creators and helps preserve
                  traditional craftsmanship skills. When you buy handmade, you're not just
                  getting a product - you're supporting someone's passion and livelihood.
                </p>
                <Link
                  href="/products"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Browse Handcrafted Items
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
        >
          <h2
            id="collection-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Featured Handcrafted Products
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Discover unique, handmade treasures from our talented artisan community.
            Each piece is carefully crafted with love and attention to detail.
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-8">
            {loading ? (
              // Loading placeholder
              Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="group block animate-pulse">
                  <div className="aspect-3/2 w-full rounded-lg bg-gray-200 lg:aspect-5/6" />
                  <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                  <div className="mt-2 h-3 bg-gray-200 rounded w-full" />
                  <div className="mt-1 h-3 bg-gray-200 rounded w-2/3" />
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 3).map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="aspect-3/2 w-full rounded-lg overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-5/6">
                    {product.images[0] ? (
                      <img
                        alt={product.name}
                        src={product.images[0]}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <ShoppingBagIcon className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center">
                    <div className="flex">{renderStars(product.averageRating)}</div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      by {product.seller.businessName || product.seller.name}
                    </span>
                  </div>
                  {product.shortDescription && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No featured products yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Check back soon for amazing handcrafted items!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="comfort-heading"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-feature-section-02.jpg"
                className="size-full object-cover"
              />
            </div>
            <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="comfort-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  {user?.role === 'seller' ? 'Showcase Your Craft' : 'Become an Artisan'}
                </h2>
                <p className="mt-3 text-xl text-white">
                  {user?.role === 'seller'
                    ? 'Complete your seller profile and start listing your handcrafted products. Share your story, showcase your skills, and connect with customers who appreciate quality craftsmanship.'
                    : 'Join our community of talented creators and start selling your handmade products. Turn your passion into profit and reach customers who value authentic, handcrafted items.'
                  }
                </p>
                <Link
                  href={user?.role === 'seller' ? '/seller/profile' : (user ? '/seller/profile' : '/register')}
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  {user?.role === 'seller' ? 'Complete Profile' : 'Start Selling'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-gray-900">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">Shop</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.shop.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Company</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">Account</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.account.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Connect</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-16 xl:mt-0">
              <h3 className="text-sm font-medium text-white">
                Sign up for our newsletter
              </h3>
              <p className="mt-6 text-sm text-gray-300">
                The latest deals and savings, sent to your inbox weekly.
              </p>
              <form className="mt-2 flex sm:max-w-md">
                <input
                  id="email-address"
                  type="text"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                />
                <div className="ml-4 shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-hidden"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 py-10">
            <p className="text-sm text-gray-400">
              Copyright &copy; 2024 Handcrafted Haven. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
