
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import { PRODUCTS, ShopifyProduct } from './constants';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  const [displayProducts, setDisplayProducts] = useState<ShopifyProduct[]>(PRODUCTS);
  const shopifyCartRef = useRef<any>(null);

  useEffect(() => {
    const initShopify = () => {
      const checkShopify = setInterval(() => {
        if ((window as any).ShopifyBuy && (window as any).ShopifyBuy.UI) {
          clearInterval(checkShopify);
          
          const client = (window as any).ShopifyBuy.buildClient({
            domain: 'c4y9ir-hb.myshopify.com',
            storefrontAccessToken: '348463a115604264983484f49040c095',
          });

          const ui = (window as any).ShopifyBuy.UI.init(client);

          // Create the Shopify Cart Component with Modulo Branding
          ui.createComponent('cart', {
            node: document.getElementById('shopify-cart-node'),
            options: {
              cart: {
                popup: true, // This ensures checkout happens in a popup/new tab
                styles: {
                  button: {
                    'background-color': '#8b9d83',
                    'font-family': 'Inter, sans-serif',
                    'font-weight': 'bold',
                    ':hover': { 'background-color': '#7a8c72' },
                    ':focus': { 'background-color': '#7a8c72' },
                    'border-radius': '12px',
                  },
                  title: { color: '#faf9f6', 'font-family': 'Playfair Display, serif' },
                  header: { color: '#faf9f6' },
                  lineItems: { color: '#faf9f6' },
                  subtotalText: { color: '#faf9f6' },
                  subtotal: { color: '#faf9f6' },
                  notice: { color: '#faf9f6' },
                  currency: { color: '#faf9f6' },
                  close: {
                    color: '#faf9f6',
                    ':hover': { color: '#8b9d83' }
                  },
                  emptyCart: { color: '#faf9f6' }
                },
                contents: {
                  button: true
                },
                text: {
                  title: 'Modulo Selection',
                  total: 'Subtotal',
                  empty: 'Your kitchen selection is empty.',
                  button: 'Checkout'
                }
              },
              toggle: {
                styles: {
                  toggle: { display: 'none' } // Hide default toggle, we use Navbar icon
                }
              }
            }
          }).then((cart: any) => {
            shopifyCartRef.current = cart;
            (window as any).moduloShopifyCart = cart;
          });

          // Sync local PRODUCTS with remote Shopify variants
          client.product.fetchAll().then((shopifyProducts: any) => {
            if (shopifyProducts && shopifyProducts.length > 0) {
              const updatedProducts = PRODUCTS.map(localProduct => {
                const remote = shopifyProducts.find((p: any) => {
                  // Try to match by shopifyId or Title
                  try {
                    const decodedId = window.atob(p.id);
                    return decodedId.includes(localProduct.shopifyId || '');
                  } catch (e) {
                    return p.title.toLowerCase() === localProduct.name.toLowerCase();
                  }
                });

                if (remote) {
                  return {
                    ...localProduct,
                    shopifyGid: remote.id,
                    variantId: remote.variants[0].id,
                    image: remote.images?.[0]?.src || localProduct.image,
                    gallery: remote.images?.map((img: any) => img.src) || localProduct.gallery,
                    price: parseFloat(remote.variants?.[0]?.price?.amount || localProduct.price.toString()),
                  };
                }
                return localProduct;
              });
              setDisplayProducts(updatedProducts);
            }
          });
        }
      }, 500);
      return () => clearInterval(checkShopify);
    };

    initShopify();
  }, []);

  const handleAddToCart = (product: any, quantity: number = 1) => {
    const cart = (window as any).moduloShopifyCart;
    if (cart && product.variantId) {
      cart.addVariantToCart({
        id: product.variantId,
        quantity: quantity
      });
      // Open the cart after adding
      if (typeof cart.toggleVisibility === 'function') {
        cart.toggleVisibility(true);
      }
    } else {
      console.warn("Shopify Cart not ready or product Variant ID missing. Ensure products are synced.");
    }
  };

  const toggleCart = () => {
    const cart = (window as any).moduloShopifyCart;
    if (cart && typeof cart.toggleVisibility === 'function') {
      cart.toggleVisibility();
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-[#8B9D83] selection:text-white">
        {/* Mount point for Shopify Cart */}
        <div id="shopify-cart-node"></div>
        <ScrollToTop />
        <Navbar toggleCart={toggleCart} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={displayProducts} onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop products={displayProducts} onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetails products={displayProducts} onAddToCart={handleAddToCart} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
