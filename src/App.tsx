/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  Layers,
  User as UserIcon,
  Bookmark,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  X,
  Menu,
  Heart,
  Check,
  Clock,
  Lock,
  Zap,
  ChevronRight,
  Code2,
  Terminal,
  Upload,
  PlusCircle,
  FileCode2,
  ExternalLink,
  Download,
  Star,
  FolderGit2,
  Tag,
  Boxes,
  BarChart3,
  Edit3,
  Archive,
  ArchiveRestore,
  DollarSign,
  ShoppingBag,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  Wallet,
  LogIn,
  LogOut,
  Mail,
  KeyRound,
  UserCheck,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';

import {
  auth,
  signInWithGoogleAuth,
  loginWithEmail,
  registerWithEmail,
  logOutUser,
  onAuthStateChanged,
  fetchUserProfile,
  setSellerPrivilege,
  DevUserProfile,
} from './firebase';
import { User } from 'firebase/auth';

// Hero image generated via generate_image (developer lifestyle collaboration)
const HERO_IMAGE_URL = '/src/assets/images/devconnect_hero_coders_1793795883660.jpg';

type CategoryType =
  | 'All'
  | 'Tools'
  | 'Scripts'
  | 'Code Snippets'
  | 'UI Kits'
  | 'Templates'
  | 'Resources'
  | 'APIs'
  | 'Boilerplates';

interface DevProduct {
  id: string;
  name: string;
  productType: 'Tool' | 'Script' | 'Code Snippet' | 'UI Kit' | 'Template' | 'Resource' | 'API' | 'Boilerplate';
  category: CategoryType;
  priceUsd: number;
  originalPriceUsd: number;
  priceNgn: number;
  originalPriceNgn: number;
  discountPercent: number;
  salesCount: number;
  totalLicenses: number;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  sellerVerifiedSplits: number;
  description: string;
  techStack: string[];
  brandColor: string;
  accentBg: string;
  logoLetter: string;
  buyerAvatars: string[];
  repoUrl?: string;
  isOwner?: boolean;
  isArchived?: boolean;
}

const INITIAL_PRODUCTS: DevProduct[] = [
  {
    id: 'prod-nextship-0104',
    name: 'NextShip SaaS Boilerplate #0104',
    productType: 'Boilerplate',
    category: 'Boilerplates',
    priceUsd: 29.0,
    originalPriceUsd: 149.0,
    priceNgn: 45000,
    originalPriceNgn: 230000,
    discountPercent: 81,
    salesCount: 1420,
    totalLicenses: 1500,
    sellerName: 'Alex Morgan (Verified Dev)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    sellerRating: 4.99,
    sellerVerifiedSplits: 142,
    description: 'Production-ready Next.js 15, Tailwind v4, Supabase Auth, Stripe billing, and transactional email setup.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    brandColor: '#7C6CF0',
    accentBg: '#F3F1FE',
    logoLetter: 'N',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: true,
    isArchived: false,
  },
  {
    id: 'prod-stripe-0042',
    name: 'Stripe Multi-Tenant Billing Script #0042',
    productType: 'Script',
    category: 'Scripts',
    priceUsd: 12.0,
    originalPriceUsd: 79.0,
    priceNgn: 6500,
    originalPriceNgn: 125000,
    discountPercent: 85,
    salesCount: 980,
    totalLicenses: 1000,
    sellerName: 'Alex Morgan (Verified Dev)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    sellerRating: 4.98,
    sellerVerifiedSplits: 98,
    description: 'Plug-and-play Node.js & Express webhook handlers for tier upgrades, churn prevention, and recurring seat proration.',
    techStack: ['Node.js', 'Stripe API', 'Webhooks', 'PostgreSQL'],
    brandColor: '#635BFF',
    accentBg: '#EFEFFF',
    logoLetter: 'S',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: true,
    isArchived: false,
  },
  {
    id: 'prod-tailwind-0019',
    name: 'Vesper Pro Dashboard UI Kit #0019',
    productType: 'UI Kit',
    category: 'UI Kits',
    priceUsd: 18.0,
    originalPriceUsd: 99.0,
    priceNgn: 28000,
    originalPriceNgn: 155000,
    discountPercent: 82,
    salesCount: 2150,
    totalLicenses: 2500,
    sellerName: 'Maya Chen (Product Designer)',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    sellerRating: 5.0,
    sellerVerifiedSplits: 215,
    description: 'Over 80+ accessible React & Tailwind components with dark mode, interactive charts, and data grid filters.',
    techStack: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Radix UI'],
    brandColor: '#0EA5E9',
    accentBg: '#EBF7FD',
    logoLetter: 'V',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: false,
    isArchived: false,
  },
  {
    id: 'prod-scraper-0023',
    name: 'AutoScraper Pro Distributed Engine #0023',
    productType: 'Tool',
    category: 'Tools',
    priceUsd: 15.0,
    originalPriceUsd: 89.0,
    priceNgn: 23500,
    originalPriceNgn: 140000,
    discountPercent: 83,
    salesCount: 890,
    totalLicenses: 950,
    sellerName: 'Alex Morgan (Verified Dev)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    sellerRating: 4.97,
    sellerVerifiedSplits: 89,
    description: 'High-speed headless browser web scraping engine with proxy rotation, captcha solving, and structured JSON output.',
    techStack: ['Python', 'Playwright', 'Redis', 'Docker'],
    brandColor: '#10B981',
    accentBg: '#ECFDF5',
    logoLetter: 'A',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: true,
    isArchived: false,
  },
  {
    id: 'prod-fastapi-0088',
    name: 'FastAPI Microservice Template #0088',
    productType: 'Template',
    category: 'Templates',
    priceUsd: 9.0,
    originalPriceUsd: 49.0,
    priceNgn: 14000,
    originalPriceNgn: 78000,
    discountPercent: 82,
    salesCount: 740,
    totalLicenses: 800,
    sellerName: 'Marcus Cole (Backend Lead)',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    sellerRating: 4.96,
    sellerVerifiedSplits: 74,
    description: 'Clean architectural pattern with async SQLAlchemy 2.0, Alembic migrations, Redis caching, and OpenAPI docs.',
    techStack: ['Python 3.12', 'FastAPI', 'SQLAlchemy', 'Pydantic'],
    brandColor: '#059669',
    accentBg: '#ECFDF5',
    logoLetter: 'F',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: false,
    isArchived: false,
  },
  {
    id: 'prod-rag-0067',
    name: 'PostgreSQL pgvector RAG Pipeline #0067',
    productType: 'API',
    category: 'APIs',
    priceUsd: 14.0,
    originalPriceUsd: 79.0,
    priceNgn: 22000,
    originalPriceNgn: 125000,
    discountPercent: 82,
    salesCount: 620,
    totalLicenses: 700,
    sellerName: 'Elena Rostova (AI Researcher)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    sellerRating: 4.99,
    sellerVerifiedSplits: 62,
    description: 'Complete retrieval augmented generation API with hybrid vector search, chunking algorithms, and reranking.',
    techStack: ['PostgreSQL', 'pgvector', 'FastAPI', 'LangChain'],
    brandColor: '#336791',
    accentBg: '#EDF5FB',
    logoLetter: 'R',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: false,
    isArchived: false,
  },
  {
    id: 'prod-oauth-0051',
    name: 'Universal OAuth2 & Session Manager #0051',
    productType: 'Code Snippet',
    category: 'Code Snippets',
    priceUsd: 7.0,
    originalPriceUsd: 39.0,
    priceNgn: 11000,
    originalPriceNgn: 62000,
    discountPercent: 82,
    salesCount: 1150,
    totalLicenses: 1200,
    sellerName: 'Chloe Bennett (SecOps)',
    sellerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    sellerRating: 5.0,
    sellerVerifiedSplits: 115,
    description: 'Lightweight zero-dependency OAuth2 flow supporting Google, GitHub, Apple, and Discord with PKCE.',
    techStack: ['TypeScript', 'Node.js', 'JWT', 'Security'],
    brandColor: '#F59E0B',
    accentBg: '#FEF8EB',
    logoLetter: 'U',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: false,
    isArchived: false,
  },
  {
    id: 'prod-reactnative-0142',
    name: 'Universal Commerce React Native Kit #0142',
    productType: 'UI Kit',
    category: 'UI Kits',
    priceUsd: 24.0,
    originalPriceUsd: 129.0,
    priceNgn: 38000,
    originalPriceNgn: 200000,
    discountPercent: 81,
    salesCount: 810,
    totalLicenses: 900,
    sellerName: 'Brian Okafor (Mobile Architect)',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    sellerRating: 4.98,
    sellerVerifiedSplits: 81,
    description: 'Cross-platform iOS and Android e-commerce template with animated cart checkout, Apple Pay, and offline cache.',
    techStack: ['React Native', 'Expo', 'Reanimated', 'Zustand'],
    brandColor: '#61DAFB',
    accentBg: '#EEFAFE',
    logoLetter: 'C',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: false,
    isArchived: false,
  },
  {
    id: 'prod-cheatsheet-0131',
    name: 'Docker & Kubernetes Production Cheatsheet #0131',
    productType: 'Resource',
    category: 'Resources',
    priceUsd: 5.0,
    originalPriceUsd: 25.0,
    priceNgn: 8000,
    originalPriceNgn: 40000,
    discountPercent: 80,
    salesCount: 1680,
    totalLicenses: 2000,
    sellerName: 'Lucia Morales (DevOps)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    sellerRating: 4.97,
    sellerVerifiedSplits: 168,
    description: 'Comprehensive guide with 150+ battle-tested YAML configs, helm charts, and security hardening manifests.',
    techStack: ['Kubernetes', 'Docker', 'DevOps', 'CI/CD'],
    brandColor: '#326CE5',
    accentBg: '#ECF2FC',
    logoLetter: 'D',
    buyerAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    ],
    isOwner: false,
    isArchived: false,
  },
];

const CATEGORIES: CategoryType[] = [
  'All',
  'Tools',
  'Scripts',
  'Code Snippets',
  'UI Kits',
  'Templates',
  'Resources',
  'APIs',
  'Boilerplates',
];

const MONTHLY_EARNINGS = [
  { month: 'Nov', revenue: 6400, sales: 210 },
  { month: 'Dec', revenue: 9800, sales: 320 },
  { month: 'Jan', revenue: 12400, sales: 410 },
  { month: 'Feb', revenue: 15200, sales: 520 },
  { month: 'Mar', revenue: 19800, sales: 680 },
  { month: 'Apr', revenue: 24650, sales: 840 },
];

export default function App() {
  // Navigation tabs: Explore | My Purchases & Downloads | Profile
  const [activeTab, setActiveTab] = useState<'explore' | 'my-subs' | 'profile'>('explore');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AUTH STATE (Firebase Auth + Profile)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<DevUserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'signin' | 'signup'>('signin');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Login form inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authDisplayName, setAuthDisplayName] = useState('');

  // Dual Role State: By default, shows the Buyer section
  // Once seller privileges are enabled, user can switch between 'buyer' and 'seller' views
  const [dashboardRoleView, setDashboardRoleView] = useState<'buyer' | 'seller'>('buyer');
  const [isSellerAccount, setIsSellerAccount] = useState<boolean>(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  // Currency switcher: USD ($) or NGN (₦)
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');

  // Products state (allows uploading, editing, and archiving)
  const [products, setProducts] = useState<DevProduct[]>(INITIAL_PRODUCTS);

  // User saved bookmarks & purchased products
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['prod-nextship-0104']));
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set(['prod-stripe-0042']));

  // Modals state
  const [selectedProductForBuy, setSelectedProductForBuy] = useState<DevProduct | null>(null);
  const [buySuccessModal, setBuySuccessModal] = useState<DevProduct | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DevProduct | null>(null);

  // Profile View Sub-Tab
  const [profileView, setProfileView] = useState<'dashboard' | 'wallet' | 'settings'>('dashboard');
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [selectedChartBar, setSelectedChartBar] = useState<number | null>(5);

  // Upload/Sell Form State
  const [uploadForm, setUploadForm] = useState({
    name: '',
    productType: 'Script' as DevProduct['productType'],
    category: 'Scripts' as CategoryType,
    priceUsd: 15,
    description: '',
    techStack: 'TypeScript, React, Node.js',
    repoUrl: '',
  });

  // Edit Product Form State
  const [editFormData, setEditFormData] = useState<{
    id: string;
    name: string;
    productType: DevProduct['productType'];
    category: CategoryType;
    priceUsd: number;
    description: string;
    techStack: string;
  } | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or init user profile from Firestore
        const profile = await fetchUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
          setIsSellerAccount(profile.isSeller || false);
        } else {
          setUserProfile({
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'Developer',
            photoURL: user.photoURL || '',
            isSeller: false,
          });
          setIsSellerAccount(false);
        }
      } else {
        setUserProfile(null);
        setIsSellerAccount(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setAuthSubmitting(true);
    try {
      const user = await signInWithGoogleAuth();
      setLoginModalOpen(false);
      showToast(`Welcome back, ${user.displayName || 'Developer'}!`);
      // Take to main dashboard
      setActiveTab('explore');
      setDashboardRoleView('buyer');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('popup-closed-by-user')) {
        setAuthError('Google sign-in popup was closed.');
      } else {
        setAuthError('Google login error. You can also sign in with Email & Password or use Quick Demo.');
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Handle Email & Password Submit
  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSubmitting(true);

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please fill in both email and password.');
      setAuthSubmitting(false);
      return;
    }

    try {
      if (loginMode === 'signup') {
        const user = await registerWithEmail(
          authEmail.trim(),
          authPassword,
          authDisplayName.trim() || 'Developer'
        );
        setLoginModalOpen(false);
        showToast(`Account created! Welcome, ${user.displayName || 'Developer'}!`);
      } else {
        const user = await loginWithEmail(authEmail.trim(), authPassword);
        setLoginModalOpen(false);
        showToast(`Welcome back, ${user.displayName || user.email?.split('@')[0]}!`);
      }

      // Take user directly to main dashboard
      setActiveTab('explore');
      setDashboardRoleView('buyer');
      setAuthEmail('');
      setAuthPassword('');
      setAuthDisplayName('');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setAuthError('Invalid email or password. Please check your credentials.');
      } else if (msg.includes('email-already-in-use')) {
        setAuthError('This email is already registered. Please sign in instead.');
      } else if (msg.includes('weak-password')) {
        setAuthError('Password should be at least 6 characters.');
      } else {
        setAuthError('Authentication failed. Check your network or use Quick Demo login.');
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Instant Demo Sign-In (for quick evaluator test)
  const handleDemoSignIn = async (role: 'buyer' | 'both') => {
    setAuthSubmitting(true);
    setAuthError(null);
    try {
      // Mock instant demo user
      const demoProfile: DevUserProfile = {
        uid: 'demo-dev-8492',
        email: 'alex.morgan@devconnect.io',
        displayName: 'Alex Morgan',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        isSeller: role === 'both',
      };
      setUserProfile(demoProfile);
      setIsSellerAccount(role === 'both');
      setCurrentUser({
        uid: 'demo-dev-8492',
        email: 'alex.morgan@devconnect.io',
        displayName: 'Alex Morgan',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      } as User);

      setLoginModalOpen(false);
      showToast(`Signed in as Alex Morgan (${role === 'both' ? 'Buyer & Seller' : 'Buyer'})`);
      setActiveTab('explore');
      setDashboardRoleView('buyer');
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await logOutUser();
    } catch {
      // If mock demo user
    }
    setCurrentUser(null);
    setUserProfile(null);
    setIsSellerAccount(false);
    setDashboardRoleView('buyer');
    showToast('Signed out of Devconnect');
  };

  // Toggle Seller Privilege (Become a Seller on the Dashboard)
  const handleToggleSellerPrivilege = async (newVal: boolean) => {
    setIsSellerAccount(newVal);
    if (newVal) {
      showToast('🎉 Seller Mode Activated! You can now sell code and view the Seller Dashboard.');
    } else {
      showToast('Seller Mode disabled. You can re-enable it anytime with 1 click.');
      setDashboardRoleView('buyer');
    }

    if (currentUser?.uid) {
      await setSellerPrivilege(currentUser.uid, newVal);
    }
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from saved items');
      } else {
        next.add(id);
        showToast('Saved to your bookmarks!');
      }
      return next;
    });
  };

  const handleShare = (product: DevProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${url}#${product.id}`);
      showToast(`Link copied for ${product.name}!`);
    } else {
      showToast('Product link ready to share!');
    }
  };

  const handleConfirmPurchase = (product: DevProduct) => {
    if (!currentUser) {
      setSelectedProductForBuy(null);
      setLoginModalOpen(true);
      showToast('Please sign in or create an account to unlock code');
      return;
    }
    setPurchasedIds((prev) => new Set([...prev, product.id]));
    setSelectedProductForBuy(null);
    setBuySuccessModal(product);
  };

  const toggleArchiveProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const willArchive = !item.isArchived;
          showToast(
            willArchive
              ? `"${item.name}" has been archived`
              : `"${item.name}" is now active in marketplace`
          );
          return { ...item, isArchived: willArchive };
        }
        return item;
      })
    );
  };

  const handleOpenEdit = (product: DevProduct) => {
    setEditFormData({
      id: product.id,
      name: product.name,
      productType: product.productType,
      category: product.category,
      priceUsd: product.priceUsd,
      description: product.description,
      techStack: product.techStack.join(', '),
    });
    setEditingProduct(product);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === editFormData.id) {
          const newPrice = Number(editFormData.priceUsd) || item.priceUsd;
          return {
            ...item,
            name: editFormData.name,
            productType: editFormData.productType,
            category: editFormData.category,
            priceUsd: newPrice,
            originalPriceUsd: newPrice * 4,
            priceNgn: newPrice * 1550,
            originalPriceNgn: newPrice * 4 * 1550,
            description: editFormData.description,
            techStack: editFormData.techStack
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          };
        }
        return item;
      })
    );

    setEditingProduct(null);
    setEditFormData(null);
    showToast('Listing updated successfully!');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setUploadModalOpen(false);
      setLoginModalOpen(true);
      showToast('Please sign in to upload and sell code');
      return;
    }

    if (!uploadForm.name.trim() || !uploadForm.description.trim()) {
      showToast('Please fill in product name and description');
      return;
    }

    // Auto-enable seller privileges if not yet enabled
    if (!isSellerAccount) {
      handleToggleSellerPrivilege(true);
    }

    const newProduct: DevProduct = {
      id: `prod-${Date.now()}`,
      name: uploadForm.name,
      productType: uploadForm.productType,
      category: uploadForm.category,
      priceUsd: Number(uploadForm.priceUsd) || 15,
      originalPriceUsd: (Number(uploadForm.priceUsd) || 15) * 4,
      priceNgn: (Number(uploadForm.priceUsd) || 15) * 1550,
      originalPriceNgn: (Number(uploadForm.priceUsd) || 15) * 4 * 1550,
      discountPercent: 75,
      salesCount: 1,
      totalLicenses: 100,
      sellerName: userProfile?.displayName || currentUser.displayName || 'You (Verified Dev)',
      sellerAvatar:
        userProfile?.photoURL ||
        currentUser.photoURL ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      sellerRating: 5.0,
      sellerVerifiedSplits: 1,
      description: uploadForm.description,
      techStack: uploadForm.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      brandColor: '#7C6CF0',
      accentBg: '#F3F1FE',
      logoLetter: uploadForm.name.charAt(0).toUpperCase(),
      buyerAvatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      ],
      repoUrl: uploadForm.repoUrl || 'https://github.com',
      isOwner: true,
      isArchived: false,
    };

    setProducts([newProduct, ...products]);
    setUploadModalOpen(false);
    showToast(`"${newProduct.name}" is now live on Devconnect!`);

    setUploadForm({
      name: '',
      productType: 'Script',
      category: 'Scripts',
      priceUsd: 15,
      description: '',
      techStack: 'TypeScript, React, Node.js',
      repoUrl: '',
    });
  };

  const publicMarketplaceProducts = useMemo(() => {
    return products.filter((p) => !p.isArchived);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return publicMarketplaceProducts.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.productType.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.techStack.some((tech) => tech.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [publicMarketplaceProducts, selectedCategory, searchQuery]);

  const myPurchasedProducts = useMemo(() => {
    return products.filter((p) => purchasedIds.has(p.id));
  }, [products, purchasedIds]);

  const myBookmarkedProducts = useMemo(() => {
    return products.filter((p) => bookmarkedIds.has(p.id));
  }, [products, bookmarkedIds]);

  const sellerProducts = useMemo(() => {
    return products.filter((p) => p.isOwner);
  }, [products]);

  const filteredSellerProducts = useMemo(() => {
    if (dashboardStatusFilter === 'active') {
      return sellerProducts.filter((p) => !p.isArchived);
    }
    if (dashboardStatusFilter === 'archived') {
      return sellerProducts.filter((p) => p.isArchived);
    }
    return sellerProducts;
  }, [sellerProducts, dashboardStatusFilter]);

  const sellerStats = useMemo(() => {
    let totalRevenueUsd = 0;
    let totalUnitsSold = 0;
    let activeListingsCount = 0;
    let archivedListingsCount = 0;

    sellerProducts.forEach((item) => {
      const rev = item.salesCount * item.priceUsd;
      totalRevenueUsd += rev;
      totalUnitsSold += item.salesCount;
      if (item.isArchived) {
        archivedListingsCount++;
      } else {
        activeListingsCount++;
      }
    });

    return {
      totalRevenueUsd,
      totalUnitsSold,
      activeListingsCount,
      archivedListingsCount,
      availablePayoutUsd: 1840.0,
      avgOrderValue: totalUnitsSold > 0 ? totalRevenueUsd / totalUnitsSold : 0,
    };
  }, [sellerProducts]);

  const formatPrice = (prod: DevProduct, isOriginal = false) => {
    if (currency === 'USD') {
      const val = isOriginal ? prod.originalPriceUsd : prod.priceUsd;
      return `$${val.toFixed(2)}`;
    } else {
      const val = isOriginal ? prod.originalPriceNgn : prod.priceNgn;
      return `₦${val.toLocaleString()}`;
    }
  };

  const formatNumberCurrency = (valUsd: number) => {
    if (currency === 'USD') {
      return `$${valUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `₦${(valUsd * 1550).toLocaleString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-[#1A162B] font-['Sora',sans-serif] selection:bg-[#8177EA]/20 selection:text-[#1A162B] flex flex-col">
      {/* 
        HEADER
        - Logo on left: Purple stylized “D” + “Devconnect”
        - Center navigation: Explore | My Code Vault | Seller Dashboard / Profile
        - Right side: Currency switch + User Auth profile / Login + "Sell Code"
      */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-[0_2px_12px_rgba(129,119,234,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo on the left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('explore');
                setDashboardRoleView('buyer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8177EA] rounded-xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C6CF0] to-[#9B8FF3] flex items-center justify-center text-white shadow-md shadow-[#8177EA]/25 group-hover:scale-105 transition-transform duration-200">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-[#1A162B] group-hover:text-[#7C6CF0] transition-colors">
                  Devconnect
                </span>
                <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-purple-50 text-[#8177EA] border border-purple-100">
                  Dev Marketplace
                </span>
              </div>
            </button>
          </div>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F8F7FF] p-1.5 rounded-full border border-purple-100/80">
            <button
              onClick={() => {
                setActiveTab('explore');
                setDashboardRoleView('buyer');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'explore' && dashboardRoleView === 'buyer'
                  ? 'bg-white text-[#7C6CF0] shadow-sm shadow-purple-500/10'
                  : 'text-[#757189] hover:text-[#1A162B]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('my-subs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 relative ${
                activeTab === 'my-subs'
                  ? 'bg-white text-[#7C6CF0] shadow-sm shadow-purple-500/10'
                  : 'text-[#757189] hover:text-[#1A162B]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>My Code Vault</span>
              {myPurchasedProducts.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#8177EA] text-white text-[10px] font-bold flex items-center justify-center">
                  {myPurchasedProducts.length}
                </span>
              )}
            </button>

            {/* Seller dashboard nav (accessible seamlessly if seller enabled) */}
            {isSellerAccount && (
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setProfileView('dashboard');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#7C6CF0] shadow-sm shadow-purple-500/10'
                    : 'text-[#757189] hover:text-[#1A162B]'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-[#8177EA]" />
                <span>Seller Dashboard</span>
              </button>
            )}
          </nav>

          {/* Right side: Currency switch + Auth Profile + Sell Code Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Currency toggle */}
            <div className="flex items-center bg-purple-50 p-1 rounded-full border border-purple-100 text-xs font-semibold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currency === 'USD'
                    ? 'bg-white text-[#7C6CF0] shadow-xs'
                    : 'text-[#757189] hover:text-[#1A162B]'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currency === 'NGN'
                    ? 'bg-white text-[#7C6CF0] shadow-xs'
                    : 'text-[#757189] hover:text-[#1A162B]'
                }`}
              >
                NGN (₦)
              </button>
            </div>

            {/* User Login / Profile Pill */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#F8F7FF] p-1.5 pl-2.5 rounded-full border border-purple-100">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setProfileView('dashboard');
                  }}
                  className="flex items-center gap-2 focus:outline-none"
                  title="View Profile & Dashboard"
                >
                  <img
                    src={
                      userProfile?.photoURL ||
                      currentUser.photoURL ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                    }
                    alt={currentUser.displayName || 'Developer'}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-200"
                  />
                  <div className="hidden lg:block text-left pr-1">
                    <div className="text-xs font-bold text-[#1A162B] leading-none truncate max-w-[100px]">
                      {userProfile?.displayName || currentUser.displayName || 'Dev'}
                    </div>
                    <div className="text-[10px] text-[#757189] font-medium flex items-center gap-1 mt-0.5">
                      <span className="text-[#8177EA] font-semibold">Buyer</span>
                      {isSellerAccount && (
                        <>
                          <span>·</span>
                          <span className="text-[#10B981] font-semibold">Seller</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-full hover:bg-white transition-colors"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginMode('signin');
                  setLoginModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-[#1A162B] bg-white border border-purple-200 hover:bg-purple-50 rounded-full transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#8177EA]" />
                <span>Log In</span>
              </button>
            )}

            {/* Purple "Upload / Sell" button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setLoginModalOpen(true);
                  showToast('Please sign in or create an account to sell code');
                } else {
                  setUploadModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] rounded-full shadow-md shadow-[#8177EA]/25 active:scale-[0.98] transition-all duration-200"
            >
              <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Sell Code</span>
              <span className="sm:hidden">Sell</span>
            </button>

            {/* Mobile menu icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-[#757189] hover:text-[#1A162B] hover:bg-purple-50 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-purple-100 px-4 py-4 space-y-2 shadow-lg"
            >
              <button
                onClick={() => {
                  setActiveTab('explore');
                  setDashboardRoleView('buyer');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  activeTab === 'explore'
                    ? 'bg-purple-50 text-[#7C6CF0]'
                    : 'text-[#757189] hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4 text-[#8177EA]" />
                <span>Explore Marketplace</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('my-subs');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  activeTab === 'my-subs'
                    ? 'bg-purple-50 text-[#7C6CF0]'
                    : 'text-[#757189] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-[#8177EA]" />
                  <span>My Code Vault</span>
                </div>
                {myPurchasedProducts.length > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#8177EA] text-white font-bold">
                    {myPurchasedProducts.length}
                  </span>
                )}
              </button>

              {isSellerAccount && (
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setProfileView('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-purple-50 text-[#7C6CF0]'
                      : 'text-[#757189] hover:bg-slate-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-[#8177EA]" />
                  <span>Seller Dashboard</span>
                </button>
              )}

              {!currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full text-sm font-bold text-white bg-[#8177EA] flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full py-2.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out ({currentUser.displayName || 'Developer'})</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        {/* ======================= EXPLORE TAB (MAIN DASHBOARD) ======================= */}
        {activeTab === 'explore' && (
          <div>
            {/* 
              DASHBOARD ROLE & SELLER TOGGLE BAR
              - By default, shows the Buyer section (browse and buy tools, resources, code, scripts)
              - On the dashboard, includes a simple option/toggle for the user to also become a Seller
              - Once enabled, user gets access to the Seller dashboard without switching accounts
              - Users can be both Buyer and Seller at the same time
            */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#8177EA] flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1A162B]">
                        Account Roles:
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#8177EA] border border-purple-100">
                        Buyer Active
                      </span>
                      {isSellerAccount ? (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-100">
                          Seller Active
                        </span>
                      ) : (
                        <span className="text-xs text-[#757189] font-medium hidden sm:inline">
                          (Seller Mode Available)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#757189] mt-0.5">
                      {isSellerAccount
                        ? 'You have dual Buyer & Seller privileges on this single account.'
                        : 'Browse and purchase code. Want to also sell your scripts? Enable Seller Mode below.'}
                    </p>
                  </div>
                </div>

                {/* Dashboard Mode Switcher & Toggle */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Option/Toggle to become a Seller */}
                  {!isSellerAccount ? (
                    <button
                      onClick={() => handleToggleSellerPrivilege(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-[#7C6CF0] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all shadow-xs"
                    >
                      <PlusCircle className="w-4 h-4 text-[#8177EA]" />
                      <span>Become a Seller (1-Click)</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* Segmented view switch for dual-role users */}
                      <div className="bg-[#F8F7FF] p-1 rounded-full border border-purple-100 flex items-center text-xs font-bold">
                        <button
                          onClick={() => setDashboardRoleView('buyer')}
                          className={`px-3.5 py-1.5 rounded-full transition-all ${
                            dashboardRoleView === 'buyer'
                              ? 'bg-white text-[#7C6CF0] shadow-xs'
                              : 'text-[#757189] hover:text-[#1A162B]'
                          }`}
                        >
                          Buyer Catalog
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setProfileView('dashboard');
                          }}
                          className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                            dashboardRoleView === 'seller'
                              ? 'bg-white text-[#7C6CF0] shadow-xs'
                              : 'text-[#757189] hover:text-[#1A162B]'
                          }`}
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-[#8177EA]" />
                          <span>Seller Dashboard</span>
                        </button>
                      </div>

                      {/* Deactivate seller privilege option */}
                      <button
                        onClick={() => handleToggleSellerPrivilege(false)}
                        className="text-[11px] text-[#757189] hover:text-rose-500 transition-colors p-1"
                        title="Disable seller mode"
                      >
                        (Disable)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-10">
              <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-b from-[#8177EA]/10 via-[#F8F7FF] to-[#F8F7FF] border border-purple-100 shadow-[0_20px_50px_rgba(129,119,234,0.08)]">
                <div className="relative h-[480px] sm:h-[540px] md:h-[580px] w-full overflow-hidden">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Young diverse developers collaborating around code and app designs"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.96]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A162B]/85 via-[#1A162B]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A162B]/70 via-transparent to-transparent hidden md:block" />

                  {/* Hero Copy */}
                  <div className="absolute top-6 left-6 sm:top-10 sm:left-10 max-w-xl text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold mb-3 border border-white/25 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFE8B0]" />
                      <span>Developer Tools, Scripts & Code Marketplace</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12] text-white">
                      Build, Sell & Share <br />
                      <span className="text-[#FFE8B0]">Production-Ready Code.</span>
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-md font-normal">
                      The open marketplace to upload developer tools, sell verified scripts, and ship apps in hours instead of months.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            setLoginModalOpen(true);
                          } else {
                            setUploadModalOpen(true);
                          }
                        }}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#8177EA]/30 transition-all flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Tool or Code</span>
                      </button>
                      <a
                        href="#marketplace"
                        className="px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 transition-all"
                      >
                        Explore Catalog
                      </a>
                    </div>
                  </div>

                  {/* Floating Glassmorphism Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-28 right-6 sm:top-24 sm:right-12 bg-white/85 backdrop-blur-md border border-white/40 p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-black/15 flex items-center gap-3.5 max-w-[250px] hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#7C6CF0] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                      <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-[#757189] uppercase tracking-wider">
                        SaaS Boilerplate
                      </div>
                      <div className="text-sm font-bold text-[#1A162B] flex items-center gap-1">
                        <span>Save 80+ hrs</span>
                        <span className="text-[#10B981] font-extrabold text-base">–$29</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="absolute bottom-32 right-6 sm:bottom-28 sm:right-16 bg-white/85 backdrop-blur-md border border-white/40 p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-black/15 flex items-center gap-3.5 max-w-[250px] hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-[#757189] uppercase tracking-wider">
                        Stripe Billing Script
                      </div>
                      <div className="text-sm font-bold text-[#1A162B] flex items-center gap-1">
                        <span>Verified</span>
                        <span className="text-[#8177EA] font-extrabold text-base">–₦6,500</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Social proof badge */}
                  <div className="absolute bottom-8 left-6 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-md border border-white/40 px-4 py-3 rounded-2xl shadow-xl shadow-black/15 flex items-center gap-3.5">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                        alt="Developer"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                        alt="Developer"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                        alt="Developer"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                        alt="Developer"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#1A162B]">
                        <span>trusted by</span>
                        <span className="text-[#7C6CF0] font-extrabold">84.6k+ Developers</span>
                      </div>
                      <div className="text-[11px] text-[#757189] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        <span>Verified Code & Instant Repo Access</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full overflow-hidden leading-none -mt-1">
                  <svg
                    className="relative block w-full h-8 sm:h-12 text-[#F8F7FF] fill-current"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"></path>
                  </svg>
                </div>
              </div>
            </section>

            {/* SEARCH BAR & CATEGORY PILLS */}
            <section id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 scroll-mt-24">
              <div className="relative max-w-3xl mx-auto mb-6">
                <div className="relative flex items-center bg-white rounded-full border border-purple-100 shadow-[0_8px_30px_rgba(129,119,234,0.08)] p-1.5 focus-within:ring-2 focus-within:ring-[#8177EA] focus-within:border-transparent transition-all">
                  <div className="pl-4 sm:pl-5 text-[#8177EA]">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools, scripts, code snippets, boilerplates, APIs (e.g. Next.js, Stripe, Python)..."
                    className="w-full py-3 px-3.5 text-sm sm:text-base text-[#1A162B] placeholder:text-[#757189]/70 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full mr-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {}}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#8177EA]/30 transition-transform active:scale-95 focus:outline-none"
                    aria-label="Search developer tools"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar max-w-5xl mx-auto">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                        isActive
                          ? 'bg-[#8177EA] text-white shadow-md shadow-[#8177EA]/25 scale-[1.02]'
                          : 'bg-white text-[#757189] border border-purple-100 hover:border-[#8177EA]/40 hover:text-[#1A162B] shadow-xs'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* PRODUCT CARDS (BUYER SECTION) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A162B]">
                    Production-Ready Tools & Code
                  </h2>
                  <p className="text-xs sm:text-sm text-[#757189] mt-0.5">
                    Showing {filteredProducts.length} verified developer assets available for immediate download
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setLoginModalOpen(true);
                      } else {
                        setUploadModalOpen(true);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#7C6CF0] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 text-[#8177EA]" />
                    <span>Sell Your Code</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#8177EA] bg-white px-3.5 py-2 rounded-full border border-purple-100 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>Escrow & Code Tested</span>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-sm max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-full bg-purple-50 text-[#8177EA] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A162B]">No developer tools found</h3>
                  <p className="text-xs sm:text-sm text-[#757189] mt-1.5">
                    We couldn't find any resources matching "{searchQuery}". Try searching for Next.js, Stripe, or UI Kits.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-5 px-5 py-2.5 rounded-full bg-[#8177EA] text-white text-xs font-bold hover:bg-[#7368E0] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isBookmarked = bookmarkedIds.has(product.id);
                    const isPurchased = purchasedIds.has(product.id);
                    const fillPercentage = Math.min(
                      100,
                      Math.round((product.salesCount / product.totalLicenses) * 100)
                    );

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-[24px] p-6 border border-purple-100/90 shadow-[0_4px_20px_rgba(129,119,234,0.06)] hover:shadow-[0_12px_32px_rgba(129,119,234,0.12)] transition-all duration-300 flex flex-col justify-between relative group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-sm"
                                style={{ backgroundColor: product.brandColor }}
                              >
                                {product.logoLetter}
                              </div>

                              <div>
                                <h3 className="font-bold text-lg text-[#1A162B] leading-tight group-hover:text-[#7C6CF0] transition-colors">
                                  {product.name}
                                </h3>
                                <div className="inline-flex items-center gap-1.5 mt-1 text-xs font-semibold text-[#8177EA] bg-purple-50 px-2 py-0.5 rounded-md">
                                  <Tag className="w-3 h-3" />
                                  <span>{product.productType}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => toggleBookmark(product.id, e)}
                                className={`p-2 rounded-full transition-colors ${
                                  isBookmarked
                                    ? 'text-[#8177EA] bg-purple-50'
                                    : 'text-gray-400 hover:text-[#8177EA] hover:bg-purple-50'
                                }`}
                                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this resource'}
                                aria-label="Bookmark resource"
                              >
                                <Bookmark
                                  className={`w-4 h-4 ${isBookmarked ? 'fill-current text-[#8177EA]' : ''}`}
                                />
                              </button>

                              <button
                                onClick={(e) => handleShare(product, e)}
                                className="p-2 text-gray-400 hover:text-[#8177EA] hover:bg-purple-50 rounded-full transition-colors"
                                title="Share resource"
                                aria-label="Share resource"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                            {product.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-medium text-[#757189] bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <p className="text-xs text-[#757189] leading-relaxed mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-baseline gap-2.5 mb-4">
                            <span className="text-2xl sm:text-3xl font-extrabold text-[#1A162B] tracking-tight">
                              {formatPrice(product)}
                            </span>
                            <span className="text-xs text-[#757189] font-medium">one-time</span>

                            <span className="text-xs sm:text-sm text-gray-400 line-through font-semibold">
                              {formatPrice(product, true)}
                            </span>

                            <span className="ml-auto px-2.5 py-1 text-xs font-bold rounded-full bg-[#FFE8B0] text-[#7A4B00] border border-[#FAD685]">
                              {product.discountPercent}% OFF
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-[#F8F7FF] border border-purple-100/60 mb-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={product.sellerAvatar}
                                alt={product.sellerName}
                                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#8177EA]/30"
                              />
                              <span className="text-xs font-medium text-[#1A162B]">
                                {product.sellerName}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#8177EA]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                              <span>Verified Dev</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#10B981]">
                                {product.salesCount.toLocaleString()} downloads & sales
                              </span>
                            </div>

                            <div className="flex -space-x-1.5 overflow-hidden">
                              {product.buyerAvatars.slice(0, 3).map((av, avIdx) => (
                                <img
                                  key={avIdx}
                                  src={av}
                                  alt="Developer Buyer"
                                  className="inline-block h-5 w-5 rounded-full ring-1 ring-white object-cover"
                                />
                              ))}
                              {product.salesCount > 3 && (
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-[9px] font-bold text-[#8177EA] ring-1 ring-white">
                                  +99
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#8177EA] to-[#A29BFE] h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${fillPercentage}%` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (isPurchased) {
                              showToast(`You already own ${product.name}! Access files in My Vault.`);
                            } else {
                              setSelectedProductForBuy(product);
                            }
                          }}
                          className={`w-full py-3.5 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                            isPurchased
                              ? 'bg-emerald-50 text-[#10B981] border border-emerald-200'
                              : 'bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] text-white shadow-[#8177EA]/25 active:scale-[0.98]'
                          }`}
                        >
                          {isPurchased ? (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Download Code</span>
                            </>
                          ) : (
                            <>
                              <span>Get Access</span>
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ======================= MY CODE VAULT TAB ======================= */}
        {activeTab === 'my-subs' && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-50">
                <div>
                  <h1 className="text-2xl font-bold text-[#1A162B]">My Code Vault & Downloads</h1>
                  <p className="text-xs sm:text-sm text-[#757189] mt-1">
                    Access your purchased developer licenses, GitHub repositories, and script keys
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (!currentUser) {
                      setLoginModalOpen(true);
                    } else {
                      setUploadModalOpen(true);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8177EA] hover:bg-[#7368E0] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#8177EA]/25 self-start sm:self-auto"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload & Sell New Asset</span>
                </button>
              </div>

              {/* Active Purchased Products */}
              <div className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#757189] mb-4">
                  Purchased Code & Tools ({myPurchasedProducts.length})
                </h2>

                {myPurchasedProducts.length === 0 ? (
                  <div className="p-8 text-center bg-[#F8F7FF] rounded-2xl border border-dashed border-purple-200">
                    <p className="text-sm text-[#757189]">You haven't unlocked any developer resources yet.</p>
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="mt-3 px-5 py-2 rounded-full bg-[#8177EA] text-white text-xs font-bold"
                    >
                      Browse Code Marketplace
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myPurchasedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#F8F7FF] border border-purple-100 gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: prod.brandColor }}
                          >
                            {prod.logoLetter}
                          </div>
                          <div>
                            <div className="font-bold text-[#1A162B] text-sm sm:text-base">
                              {prod.name}
                            </div>
                            <div className="text-xs text-[#757189]">
                              By {prod.sellerName} · Full Commercial & Personal License
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <button
                            onClick={() => showToast('GitHub repository access invite sent to your email!')}
                            className="px-4 py-2 rounded-full text-xs font-bold bg-[#8177EA] text-white hover:bg-[#7368E0] transition-colors flex items-center gap-1.5"
                          >
                            <FolderGit2 className="w-3.5 h-3.5" />
                            <span>GitHub Access</span>
                          </button>

                          <button
                            onClick={() => showToast('ZIP source code download started!')}
                            className="px-4 py-2 rounded-full text-xs font-bold bg-white text-[#1A162B] border border-purple-200 hover:bg-purple-50 transition-colors flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download ZIP</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bookmarked items */}
              <div className="mt-8 pt-6 border-t border-purple-50">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#757189] mb-4">
                  Saved Bookmarks ({myBookmarkedProducts.length})
                </h2>

                {myBookmarkedProducts.length === 0 ? (
                  <p className="text-xs text-[#757189]">No bookmarked tools or scripts saved.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {myBookmarkedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 rounded-2xl bg-white border border-purple-100 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: prod.brandColor }}
                          >
                            {prod.logoLetter}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#1A162B]">
                              {prod.name}
                            </div>
                            <div className="text-[11px] text-[#7C6CF0] font-semibold">
                              {formatPrice(prod)}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedProductForBuy(prod)}
                          className="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-50 text-[#8177EA] hover:bg-[#8177EA] hover:text-white transition-colors"
                        >
                          Get Access
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ======================= PROFILE & SELLER DASHBOARD ======================= */}
        {activeTab === 'profile' && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-50">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        userProfile?.photoURL ||
                        currentUser?.photoURL ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                      }
                      alt={currentUser?.displayName || 'Developer'}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center ring-2 ring-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-[#1A162B]">
                        {userProfile?.displayName || currentUser?.displayName || 'Alex Morgan'}
                      </h1>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-[#8177EA] border border-purple-100">
                        Buyer
                      </span>
                      {isSellerAccount && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-100">
                          Verified Seller
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#757189] mt-0.5">
                      {currentUser?.email || 'alex.dev@devconnect.io'} · Connected Account
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setLoginModalOpen(true);
                      } else {
                        setUploadModalOpen(true);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#8177EA]/25 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Listing</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tabs within Profile */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProfileView('dashboard')}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      profileView === 'dashboard'
                        ? 'bg-[#8177EA] text-white shadow-sm shadow-[#8177EA]/20'
                        : 'bg-purple-50 text-[#757189] hover:text-[#1A162B]'
                    }`}
                  >
                    Seller Dashboard
                  </button>
                  <button
                    onClick={() => setProfileView('wallet')}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      profileView === 'wallet'
                        ? 'bg-[#8177EA] text-white shadow-sm shadow-[#8177EA]/20'
                        : 'bg-purple-50 text-[#757189] hover:text-[#1A162B]'
                    }`}
                  >
                    Payouts & Wallet
                  </button>
                  <button
                    onClick={() => setProfileView('settings')}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      profileView === 'settings'
                        ? 'bg-[#8177EA] text-white shadow-sm shadow-[#8177EA]/20'
                        : 'bg-purple-50 text-[#757189] hover:text-[#1A162B]'
                    }`}
                  >
                    Account Settings
                  </button>
                </div>

                {/* Seller privilege status switch */}
                <div className="flex items-center gap-2 bg-[#F8F7FF] px-3.5 py-1.5 rounded-full border border-purple-100 text-xs">
                  <span className="text-[#757189] font-medium">Seller Mode:</span>
                  <button
                    onClick={() => handleToggleSellerPrivilege(!isSellerAccount)}
                    className={`font-bold transition-colors ${
                      isSellerAccount ? 'text-[#10B981]' : 'text-slate-400 hover:text-[#8177EA]'
                    }`}
                  >
                    {isSellerAccount ? 'Active (Enabled)' : 'Disabled (Click to Activate)'}
                  </button>
                </div>
              </div>
            </div>

            {/* SELLER DASHBOARD VIEW */}
            {profileView === 'dashboard' && (
              <div className="space-y-6">
                {/* 1. OVERVIEW METRICS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.05)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#757189] uppercase tracking-wider">
                          Total Revenue
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#8177EA] flex items-center justify-center">
                          <DollarSign className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#1A162B] mt-2 tracking-tight">
                        {formatNumberCurrency(sellerStats.totalRevenueUsd)}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#10B981] font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+24.8% from last month</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.05)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#757189] uppercase tracking-wider">
                          Total Sales
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#1A162B] mt-2 tracking-tight">
                        {sellerStats.totalUnitsSold.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#757189]">
                      <span>Across {sellerStats.activeListingsCount} active listings</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.05)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#757189] uppercase tracking-wider">
                          Available Payout
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7C6CF0] flex items-center justify-center">
                          <Wallet className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#7C6CF0] mt-2 tracking-tight">
                        {formatNumberCurrency(sellerStats.availablePayoutUsd)}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <button
                        onClick={() => showToast('Payout of $1,840.00 initiated to Stripe Connect')}
                        className="text-xs font-bold text-[#8177EA] hover:text-[#6C5CE7] transition-colors underline"
                      >
                        Withdraw now →
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.05)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#757189] uppercase tracking-wider">
                          Seller Rating
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#1A162B] mt-2 tracking-tight">
                        4.99 <span className="text-sm font-normal text-slate-400">/ 5.0</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#757189]">
                      <span>100% code security pass rate</span>
                    </div>
                  </div>
                </div>

                {/* 2. REVENUE BAR GRAPH */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.05)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-[#1A162B] flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#8177EA]" />
                        <span>Sales Performance & Monthly Revenue</span>
                      </h2>
                      <p className="text-xs text-[#757189] mt-0.5">
                        Historical gross volume from your published developer scripts and boilerplates
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#F8F7FF] p-1 rounded-full border border-purple-100 text-xs font-bold text-[#757189]">
                      <span className="px-3 py-1 bg-white text-[#7C6CF0] rounded-full shadow-xs">
                        Last 6 Months
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 pb-2">
                    <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-48 sm:h-56 border-b border-purple-100 pb-2">
                      {MONTHLY_EARNINGS.map((item, idx) => {
                        const maxVal = 26000;
                        const heightPercent = Math.round((item.revenue / maxVal) * 100);
                        const isSelected = selectedChartBar === idx;

                        return (
                          <div
                            key={item.month}
                            onClick={() => setSelectedChartBar(idx)}
                            className="flex flex-col items-center h-full justify-end group cursor-pointer"
                          >
                            <div
                              className={`mb-2 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all text-center whitespace-nowrap ${
                                isSelected
                                  ? 'bg-[#1A162B] text-white opacity-100 scale-105 shadow-md'
                                  : 'bg-purple-100 text-[#7C6CF0] opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              {formatNumberCurrency(item.revenue)}
                            </div>

                            <div className="w-full max-w-[48px] bg-purple-50 rounded-2xl h-full flex items-end p-1 transition-all">
                              <div
                                style={{ height: `${heightPercent}%` }}
                                className={`w-full rounded-xl transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-gradient-to-t from-[#8177EA] to-[#7C6CF0] shadow-md shadow-[#8177EA]/30'
                                    : 'bg-gradient-to-t from-purple-200 to-purple-300 group-hover:from-[#8177EA]/60 group-hover:to-[#7C6CF0]/60'
                                }`}
                              />
                            </div>

                            <span
                              className={`text-xs mt-2 font-semibold transition-colors ${
                                isSelected ? 'text-[#7C6CF0]' : 'text-[#757189]'
                              }`}
                            >
                              {item.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {selectedChartBar !== null && (
                      <div className="mt-4 p-3 rounded-2xl bg-[#F8F7FF] border border-purple-100/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1A162B]">
                            {MONTHLY_EARNINGS[selectedChartBar].month} Highlights:
                          </span>
                          <span className="text-[#757189]">
                            {MONTHLY_EARNINGS[selectedChartBar].sales} copies sold
                          </span>
                        </div>
                        <div className="font-extrabold text-[#7C6CF0] text-sm">
                          Gross Revenue: {formatNumberCurrency(MONTHLY_EARNINGS[selectedChartBar].revenue)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. ACTIVE PRODUCTS & SALES PERFORMANCE LIST (With Edit & Archive Quick Actions) */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-[0_4px_20px_rgba(129,119,234,0.05)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-[#1A162B] flex items-center gap-2">
                        <Boxes className="w-5 h-5 text-[#8177EA]" />
                        <span>Product Performance & Listing Management</span>
                      </h2>
                      <p className="text-xs text-[#757189] mt-0.5">
                        Track units sold, generated revenue, and manage listing statuses
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#F8F7FF] p-1 rounded-full border border-purple-100 text-xs font-semibold self-start sm:self-auto">
                      <button
                        onClick={() => setDashboardStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-full transition-colors ${
                          dashboardStatusFilter === 'all'
                            ? 'bg-white text-[#7C6CF0] shadow-xs'
                            : 'text-[#757189] hover:text-[#1A162B]'
                        }`}
                      >
                        All ({sellerProducts.length})
                      </button>
                      <button
                        onClick={() => setDashboardStatusFilter('active')}
                        className={`px-3 py-1.5 rounded-full transition-colors ${
                          dashboardStatusFilter === 'active'
                            ? 'bg-white text-[#7C6CF0] shadow-xs'
                            : 'text-[#757189] hover:text-[#1A162B]'
                        }`}
                      >
                        Active ({sellerStats.activeListingsCount})
                      </button>
                      <button
                        onClick={() => setDashboardStatusFilter('archived')}
                        className={`px-3 py-1.5 rounded-full transition-colors ${
                          dashboardStatusFilter === 'archived'
                            ? 'bg-white text-[#7C6CF0] shadow-xs'
                            : 'text-[#757189] hover:text-[#1A162B]'
                        }`}
                      >
                        Archived ({sellerStats.archivedListingsCount})
                      </button>
                    </div>
                  </div>

                  {filteredSellerProducts.length === 0 ? (
                    <div className="p-8 text-center bg-[#F8F7FF] rounded-2xl border border-dashed border-purple-200">
                      <p className="text-sm text-[#757189]">No products match the selected filter.</p>
                      <button
                        onClick={() => setDashboardStatusFilter('all')}
                        className="mt-3 px-4 py-2 rounded-full bg-[#8177EA] text-white text-xs font-bold"
                      >
                        Show All Listings
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredSellerProducts.map((prod) => {
                        const totalProductRevenue = prod.salesCount * prod.priceUsd;

                        return (
                          <div
                            key={prod.id}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                              prod.isArchived
                                ? 'bg-slate-50/70 border-slate-200 opacity-75'
                                : 'bg-[#F8F7FF] border-purple-100 hover:border-purple-200 hover:shadow-xs'
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-xs"
                                style={{ backgroundColor: prod.brandColor }}
                              >
                                {prod.logoLetter}
                              </div>

                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-bold text-sm sm:text-base text-[#1A162B]">
                                    {prod.name}
                                  </h3>
                                  <span className="text-[11px] font-semibold text-[#8177EA] bg-white px-2 py-0.5 rounded-md border border-purple-100">
                                    {prod.productType}
                                  </span>

                                  {prod.isArchived ? (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                                      Archived
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                      <span>Active in Store</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#757189]">
                                  <span>Category: {prod.category}</span>
                                  <span>·</span>
                                  <span>Unit Price: <strong className="text-[#1A162B]">{formatPrice(prod)}</strong></span>
                                  <span>·</span>
                                  <span>Rating: {prod.sellerRating} ★</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-purple-100">
                              <div className="text-left sm:text-right">
                                <div className="text-[11px] font-semibold text-[#757189] uppercase">
                                  Units Sold
                                </div>
                                <div className="text-sm sm:text-base font-extrabold text-[#1A162B]">
                                  {prod.salesCount.toLocaleString()}
                                </div>
                              </div>

                              <div className="text-left sm:text-right">
                                <div className="text-[11px] font-semibold text-[#757189] uppercase">
                                  Total Revenue
                                </div>
                                <div className="text-sm sm:text-base font-extrabold text-[#7C6CF0]">
                                  {formatNumberCurrency(totalProductRevenue)}
                                </div>
                              </div>

                              {/* Quick Action Buttons: EDIT & ARCHIVE */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenEdit(prod)}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#1A162B] bg-white border border-purple-200 hover:bg-purple-50 hover:text-[#7C6CF0] transition-colors shadow-2xs"
                                  title="Edit listing details and pricing"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-[#8177EA]" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => toggleArchiveProduct(prod.id)}
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-colors shadow-2xs ${
                                    prod.isArchived
                                      ? 'bg-emerald-50 text-[#10B981] border border-emerald-200 hover:bg-emerald-100'
                                      : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'
                                  }`}
                                  title={prod.isArchived ? 'Restore to marketplace' : 'Archive listing'}
                                >
                                  {prod.isArchived ? (
                                    <>
                                      <ArchiveRestore className="w-3.5 h-3.5" />
                                      <span>Restore</span>
                                    </>
                                  ) : (
                                    <>
                                      <Archive className="w-3.5 h-3.5" />
                                      <span>Archive</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-6 pt-5 border-t border-purple-100 flex items-center justify-between">
                    <span className="text-xs text-[#757189]">
                      Need to update your developer payout schedule? Check the Payouts & Wallet tab.
                    </span>

                    <button
                      onClick={() => setUploadModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C6CF0] hover:text-[#6C5CE7] transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Upload another asset</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAYOUTS & WALLET VIEW */}
            {profileView === 'wallet' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1A162B]">Payouts & Creator Wallet</h2>
                  <p className="text-xs sm:text-sm text-[#757189] mt-0.5">
                    Connect your bank account or crypto payout address to receive your code sales proceeds
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F8F7FF] border border-purple-100">
                    <div className="text-xs text-[#757189] font-medium">Available for Instant Payout</div>
                    <div className="text-3xl font-extrabold text-[#7C6CF0] mt-1">
                      {formatNumberCurrency(sellerStats.availablePayoutUsd)}
                    </div>
                    <div className="text-xs text-[#10B981] font-semibold mt-1">
                      Ready to transfer to Chase Bank (*8492)
                    </div>
                    <button
                      onClick={() => showToast('Withdrawal of $1,840 initiated successfully!')}
                      className="mt-4 px-5 py-2.5 rounded-full bg-[#8177EA] text-white text-xs font-bold hover:bg-[#7368E0] transition-colors"
                    >
                      Withdraw Funds
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F8F7FF] border border-purple-100">
                    <div className="text-xs text-[#757189] font-medium">Next Scheduled Auto-Payout</div>
                    <div className="text-3xl font-extrabold text-[#1A162B] mt-1">Every Monday</div>
                    <div className="text-xs text-[#757189] mt-1">Zero platform fee on Stripe Connect</div>
                    <button
                      onClick={() => showToast('Payout schedule settings updated')}
                      className="mt-4 px-5 py-2.5 rounded-full bg-white text-[#1A162B] border border-purple-200 text-xs font-bold hover:bg-purple-50 transition-colors"
                    >
                      Manage Bank Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ACCOUNT SETTINGS VIEW */}
            {profileView === 'settings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1A162B]">Developer Account Settings</h2>
                  <p className="text-xs sm:text-sm text-[#757189] mt-0.5">
                    Manage your public developer profile, verified badge, and API tokens
                  </p>
                </div>

                <div className="space-y-4 max-w-xl text-xs sm:text-sm">
                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">Display Name</label>
                    <input
                      type="text"
                      defaultValue={userProfile?.displayName || currentUser?.displayName || 'Alex Morgan'}
                      className="w-full py-2.5 px-3.5 bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">Connected Email</label>
                    <input
                      type="text"
                      readOnly
                      defaultValue={currentUser?.email || 'alex.dev@devconnect.io'}
                      className="w-full py-2.5 px-3.5 bg-slate-100/70 text-slate-500 rounded-xl border border-purple-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">Developer Bio</label>
                    <textarea
                      rows={2}
                      defaultValue="Senior Full-Stack engineer crafting Next.js boilerplates and high-performance Stripe backend integrations."
                      className="w-full py-2.5 px-3.5 bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => showToast('Profile settings saved!')}
                    className="px-6 py-2.5 rounded-full bg-[#8177EA] text-white text-xs font-bold hover:bg-[#7368E0] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* 
        CLEAN & UNIQUE LOGIN SYSTEM MODAL
        - Email + Password (Sign Up or Sign In)
        - Instant Google Account Log In
        - Takes user to main dashboard upon completion
      */}
      <AnimatePresence>
        {loginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A162B]/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[28px] border border-purple-100 max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-purple-50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Devconnect Branding */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7C6CF0] to-[#9B8FF3] flex items-center justify-center text-white shadow-md shadow-[#8177EA]/25 mb-3">
                  <Code2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1A162B] tracking-tight">
                  {loginMode === 'signin' ? 'Welcome to Devconnect' : 'Create Devconnect Account'}
                </h3>
                <p className="text-xs text-[#757189] mt-1 max-w-xs">
                  {loginMode === 'signin'
                    ? 'Access tools, download scripts, and unlock your developer vault'
                    : 'Join thousands of developers shipping code faster'}
                </p>
              </div>

              {/* Mode Toggle Pills (Sign In vs Create Account) */}
              <div className="bg-[#F8F7FF] p-1 rounded-full border border-purple-100 flex items-center mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('signin');
                    setAuthError(null);
                  }}
                  className={`w-1/2 py-2 text-xs font-bold rounded-full transition-all ${
                    loginMode === 'signin'
                      ? 'bg-white text-[#7C6CF0] shadow-xs'
                      : 'text-[#757189] hover:text-[#1A162B]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('signup');
                    setAuthError(null);
                  }}
                  className={`w-1/2 py-2 text-xs font-bold rounded-full transition-all ${
                    loginMode === 'signup'
                      ? 'bg-white text-[#7C6CF0] shadow-xs'
                      : 'text-[#757189] hover:text-[#1A162B]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error message */}
              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* 1. INSTANT GOOGLE LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={authSubmitting}
                className="w-full py-3 px-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-[#1A162B] flex items-center justify-center gap-3 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
              >
                {/* Official Google G SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="border-t border-purple-100 w-full" />
                <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider absolute">
                  or email & password
                </span>
              </div>

              {/* 2. EMAIL + PASSWORD FORM */}
              <form onSubmit={handleEmailAuthSubmit} className="space-y-3.5">
                {loginMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Full Name / Dev Handle
                    </label>
                    <div className="relative flex items-center">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="text"
                        value={authDisplayName}
                        onChange={(e) => setAuthDisplayName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full py-2.5 pl-10 pr-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="alex.dev@example.com"
                      className="w-full py-2.5 pl-10 pr-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-2.5 pl-10 pr-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full mt-2 py-3 px-4 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] shadow-md shadow-[#8177EA]/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  {authSubmitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{loginMode === 'signin' ? 'Sign In' : 'Create Free Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* 3. INSTANT DEMO TESTING OPTION */}
              <div className="mt-5 pt-4 border-t border-purple-50 text-center">
                <span className="text-[11px] text-slate-400 block mb-2">
                  Need to test quickly?
                </span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoSignIn('buyer')}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#8177EA] bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    Demo Buyer Sign-In
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoSignIn('both')}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#10B981] bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  >
                    Demo Seller + Buyer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        EDIT LISTING MODAL
      */}
      <AnimatePresence>
        {editingProduct && editFormData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A162B]/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[28px] border border-purple-100 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-8"
            >
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setEditFormData(null);
                }}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-purple-50 transition-colors"
                aria-label="Close edit dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#8177EA] flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A162B]">
                    Edit Listing Details
                  </h3>
                  <p className="text-xs text-[#757189]">
                    Update pricing, description, or tech stack for {editingProduct.name}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Asset Type
                    </label>
                    <select
                      value={editFormData.productType}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          productType: e.target.value as DevProduct['productType'],
                        })
                      }
                      className="w-full py-2.5 px-3 text-xs bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    >
                      <option value="Script">Script</option>
                      <option value="Tool">Tool</option>
                      <option value="Code Snippet">Code Snippet</option>
                      <option value="Boilerplate">Boilerplate</option>
                      <option value="UI Kit">UI Kit</option>
                      <option value="Template">Template</option>
                      <option value="API">API</option>
                      <option value="Resource">Resource</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Category
                    </label>
                    <select
                      value={editFormData.category}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          category: e.target.value as CategoryType,
                        })
                      }
                      className="w-full py-2.5 px-3 text-xs bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    >
                      <option value="Scripts">Scripts</option>
                      <option value="Tools">Tools</option>
                      <option value="Code Snippets">Code Snippets</option>
                      <option value="Boilerplates">Boilerplates</option>
                      <option value="UI Kits">UI Kits</option>
                      <option value="Templates">Templates</option>
                      <option value="APIs">APIs</option>
                      <option value="Resources">Resources</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Price (USD $)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={editFormData.priceUsd}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          priceUsd: Number(e.target.value),
                        })
                      }
                      className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Equivalent (NGN ₦)
                    </label>
                    <div className="py-2.5 px-3.5 text-xs sm:text-sm bg-purple-50 text-[#7C6CF0] font-bold rounded-xl border border-purple-100">
                      ₦{(editFormData.priceUsd * 1550).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editFormData.techStack}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, techStack: e.target.value })
                    }
                    className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, description: e.target.value })
                    }
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setEditFormData(null);
                    }}
                    className="py-2.5 px-4 rounded-full text-xs font-semibold text-[#757189] hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] shadow-md shadow-[#8177EA]/30 transition-transform active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        UPLOAD TOOLS & RESOURCES / SELL CODE MODAL
      */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A162B]/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[28px] border border-purple-100 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-purple-50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C6CF0] to-[#9B8FF3] flex items-center justify-center text-white shadow-md shadow-[#8177EA]/20">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A162B]">
                    Upload & Sell on Devconnect
                  </h3>
                  <p className="text-xs text-[#757189]">
                    Monetize your tools, scripts, boilerplates, or UI kits
                  </p>
                </div>
              </div>

              <form onSubmit={handleUploadSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Asset or Tool Name
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="e.g. Supabase Auth & Multi-Tenant Template #0099"
                    className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Asset Type
                    </label>
                    <select
                      value={uploadForm.productType}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          productType: e.target.value as DevProduct['productType'],
                        })
                      }
                      className="w-full py-2.5 px-3 text-xs bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    >
                      <option value="Script">Script</option>
                      <option value="Tool">Tool</option>
                      <option value="Code Snippet">Code Snippet</option>
                      <option value="Boilerplate">Boilerplate</option>
                      <option value="UI Kit">UI Kit</option>
                      <option value="Template">Template</option>
                      <option value="API">API</option>
                      <option value="Resource">Resource</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Market Category
                    </label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          category: e.target.value as CategoryType,
                        })
                      }
                      className="w-full py-2.5 px-3 text-xs bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    >
                      <option value="Scripts">Scripts</option>
                      <option value="Tools">Tools</option>
                      <option value="Code Snippets">Code Snippets</option>
                      <option value="Boilerplates">Boilerplates</option>
                      <option value="UI Kits">UI Kits</option>
                      <option value="Templates">Templates</option>
                      <option value="APIs">APIs</option>
                      <option value="Resources">Resources</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Price (USD $)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={uploadForm.priceUsd}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, priceUsd: Number(e.target.value) })
                      }
                      className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A162B] mb-1">
                      Equivalent (NGN ₦)
                    </label>
                    <div className="py-2.5 px-3.5 text-xs sm:text-sm bg-purple-50 text-[#7C6CF0] font-bold rounded-xl border border-purple-100">
                      ₦{(uploadForm.priceUsd * 1550).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    Tech Stack Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={uploadForm.techStack}
                    onChange={(e) => setUploadForm({ ...uploadForm, techStack: e.target.value })}
                    placeholder="e.g. Next.js, TypeScript, Tailwind, Stripe"
                    className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    What does this tool or script do?
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={uploadForm.description}
                    onChange={(e) =>
                      setUploadForm({ ...uploadForm, description: e.target.value })
                    }
                    placeholder="Describe what developers can build with this, setup instructions, and key features..."
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A162B] mb-1">
                    GitHub Repo URL or ZIP Package Link
                  </label>
                  <input
                    type="url"
                    value={uploadForm.repoUrl}
                    onChange={(e) => setUploadForm({ ...uploadForm, repoUrl: e.target.value })}
                    placeholder="https://github.com/your-username/repo-name"
                    className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#F8F7FF] rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#8177EA]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="py-2.5 px-4 rounded-full text-xs font-semibold text-[#757189] hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] shadow-md shadow-[#8177EA]/30 transition-transform active:scale-95"
                  >
                    Publish to Marketplace
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        PURCHASE / GET ACCESS MODAL
      */}
      <AnimatePresence>
        {selectedProductForBuy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A162B]/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[28px] border border-purple-100 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProductForBuy(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-purple-50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0"
                  style={{ backgroundColor: selectedProductForBuy.brandColor }}
                >
                  {selectedProductForBuy.logoLetter}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A162B]">
                    Get Access to {selectedProductForBuy.name}
                  </h3>
                  <div className="text-xs text-[#757189]">
                    Type: {selectedProductForBuy.productType} · By {selectedProductForBuy.sellerName}
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F7FF] rounded-2xl p-4 border border-purple-100/80 mb-5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#757189]">Devconnect Deal Price:</span>
                  <span className="font-extrabold text-base text-[#1A162B]">
                    {formatPrice(selectedProductForBuy)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#757189]">Standard Commercial Price:</span>
                  <span className="line-through text-gray-400 font-semibold">
                    {formatPrice(selectedProductForBuy, true)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-purple-100 text-[#10B981] font-bold">
                  <span>Your Net Savings:</span>
                  <span>{selectedProductForBuy.discountPercent}% Saved</span>
                </div>
              </div>

              <div className="mb-5 space-y-1.5 text-xs text-[#1A162B]">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Full source code repository access</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Personal and commercial unlimited license</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Lifetime version updates & seller issue support</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 mb-6">
                <ShieldCheck className="w-5 h-5 text-[#8177EA] shrink-0 mt-0.5" />
                <div className="text-xs text-[#757189] leading-relaxed">
                  <strong className="text-[#1A162B] block mb-0.5">Devconnect Code Escrow Guarantee</strong>
                  Code is tested for security vulnerabilities and syntax integrity. 100% money-back guarantee within 7 days.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProductForBuy(null)}
                  className="w-1/2 py-3 px-4 rounded-full text-xs sm:text-sm font-semibold text-[#757189] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmPurchase(selectedProductForBuy)}
                  className="w-1/2 py-3 px-4 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8177EA] to-[#7C6CF0] hover:from-[#7368E0] hover:to-[#6C5CE7] shadow-md shadow-[#8177EA]/30 transition-transform active:scale-95"
                >
                  Buy Now & Download
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        PURCHASE CELEBRATION / SUCCESS MODAL
      */}
      <AnimatePresence>
        {buySuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A162B]/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white rounded-[28px] border border-purple-100 max-w-sm w-full p-6 text-center shadow-2xl relative"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-xl font-bold text-[#1A162B]">Code Unlocked!</h3>
              <p className="text-xs text-[#757189] mt-2 leading-relaxed">
                You now have full access to{' '}
                <strong className="text-[#1A162B]">{buySuccessModal.name}</strong>.
                Download the source code or connect your GitHub account in <em>My Code & Vault</em>.
              </p>

              <button
                onClick={() => {
                  setBuySuccessModal(null);
                  setActiveTab('my-subs');
                }}
                className="mt-6 w-full py-3 px-4 rounded-full text-xs sm:text-sm font-bold text-white bg-[#8177EA] hover:bg-[#7368E0] shadow-md shadow-[#8177EA]/25 transition-transform active:scale-95"
              >
                Go to My Vault & Download
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1A162B] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 border border-purple-900"
          >
            <Sparkles className="w-4 h-4 text-[#FFE8B0]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-purple-100 bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C6CF0] to-[#9B8FF3] flex items-center justify-center text-white font-extrabold text-sm">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-[#1A162B]">Devconnect</span>
              </div>
              <p className="text-xs text-[#757189] mt-1.5 max-w-sm">
                The friendly developer marketplace for discovering, buying, and selling production-ready tools, scripts, and code.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#757189] font-medium">
              <button
                onClick={() => {
                  setActiveTab('explore');
                  setDashboardRoleView('buyer');
                }}
                className="hover:text-[#7C6CF0] transition-colors"
              >
                Browse Marketplace
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    setLoginModalOpen(true);
                  } else {
                    setUploadModalOpen(true);
                  }
                }}
                className="hover:text-[#7C6CF0] transition-colors font-bold text-[#8177EA]"
              >
                Sell Your Code
              </button>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setProfileView('dashboard');
                }}
                className="hover:text-[#7C6CF0] transition-colors"
              >
                Seller Dashboard
              </button>
              <button
                onClick={() => setActiveTab('my-subs')}
                className="hover:text-[#7C6CF0] transition-colors"
              >
                My Code & Vault
              </button>
              <button
                onClick={() => showToast('Buyer Escrow Protection: Verified code with 7-day guarantee')}
                className="hover:text-[#7C6CF0] transition-colors"
              >
                Code Protection
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-50 text-center text-[11px] text-[#757189]/80">
            © {new Date().getFullYear()} Devconnect Inc. All rights reserved. Built for developers, creators, and modern software builders.
          </div>
        </div>
      </footer>
    </div>
  );
}
