
'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { BlogPost } from '@/types';
import { SeasonalEffects } from '@/components/SeasonalEffects';
import ThemeSwitcher from '@/components/ThemeSwitcher';
// import WaterDrop from '@/components/WaterDrop';

const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Hello World',
    date: '2022-01-01',
    coverImage: 'https://via.placeholder.com/800x400',
    summary: 'This is a summary of the article',
    content: 'This is the content of the article',
    language: 'en',
  },
];

const Component: React.FC = () => {
  const { currentTheme } = useTheme();
  const { language } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showResources, setShowResources] = useState(false);
  const [showBlogList, setShowBlogList] = useState(false);

  const handleOpenLatestPost = () => {
    const localizedPosts = posts.filter(p => p.language === language);
    const postToOpen = localizedPosts.length > 0 ? localizedPosts[0] : posts[0];
    if (postToOpen) {
      setSelectedPost(postToOpen);
    }
  };

  const handleOpenBlogList = () => {
    setShowBlogList(true);
  };

  const handleSelectPostFromList = (post: BlogPost) => {
    setShowBlogList(false); // Close list
    setSelectedPost(post); // Open article
  };

  return (
    <div className={`min-h-screen w-full ${currentTheme.colors.background} p-4 sm:p-8 relative overflow-hidden ${currentTheme.colors.selection} transition-colors duration-700 ease-in-out`}>

      {/* Background Orbs for atmosphere */}
      <div className={`fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] ${currentTheme.colors.orb1} rounded-full blur-[100px] pointer-events-none transition-colors duration-700`} />
      <div className={`fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] ${currentTheme.colors.orb2} rounded-full blur-[100px] pointer-events-none transition-colors duration-700`} />

      {/* Seasonal Particle Effects */}
      <SeasonalEffects />

      {/* The Physics Drop */}
      {/* <WaterDrop /> */}

      {/* Article Modal */}
      {/* <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} /> */}

      {/* Resources / Yellow Pages Modal */}
      {/* <ResourcesModal isOpen={showResources} onClose={() => setShowResources(false)} /> */}

      {/* Blog List Modal */}
      {/* <BlogListModal
        isOpen={showBlogList}
        onClose={() => setShowBlogList(false)}
        onSelectPost={handleSelectPostFromList}
      /> */}

      <div className="max-w-7xl mx-auto h-full relative z-10">

        {/* Floating Header Actions (Bottom Right) */}
        <div className="fixed bottom-8 right-8 flex flex-col-reverse items-end gap-4 z-50">
          <ThemeSwitcher />

          <button
            className={`hidden lg:flex ${currentTheme.colors.accentBg} w-14 h-14 rounded-full items-center justify-center shadow-xl ${currentTheme.colors.shadow} hover:-translate-y-1 transition-transform`}
            title="Write"
          >
            {/* <PenTool size={24} /> */}
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-4rem)]">

          {/* Left Column: Sidebar (3 cols) */}
          <div className="lg:col-span-3 h-full">
            {/* <Sidebar
              onOpenArticle={handleOpenBlogList}
              onOpenResources={() => setShowResources(true)}
            /> */}
          </div>

          {/* Middle Column: Hero & Misc (6 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="h-[200px] lg:h-1/3 w-full">
              {/* Top Image Card - Simulated via GlassCard with custom Image */}
              <div className={`w-full h-full rounded-[2rem] overflow-hidden relative shadow-sm border ${currentTheme.colors.cardBorder}`}>
                <img src="https://picsum.photos/800/400?random=10" className="w-full h-full object-cover" alt="Banner" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div className="flex-1">
              {/* <ProfileHero />  */}
            </div>

            <div className="h-auto lg:h-[140px] grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* <NewArticle onClick={handleOpenLatestPost} /> */}
              <div className="grid grid-cols-3 gap-3">
                {/* <div className="col-span-2"><GithubWidget /></div> */}
                {/* <div className="col-span-1"><MailWidget /></div> */}
              </div>
            </div>
          </div>

          {/* Right Column: Widgets (3 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              {/* <QuoteWidget /> */}
            </div>

            <div className="flex-1">
              {/* <CalendarWidget /> */}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 h-[60px]">
                <div className="flex-1">
                  {/* <JuejinWidget /> */}
                </div>
              </div>
              {/* <MusicPlayer /> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default Component;