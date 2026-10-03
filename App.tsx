import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProgramsView } from './views/ProgramsView';
import { TrainersView } from './views/TrainersView';
import { MembershipView } from './views/MembershipView';
import { ScheduleView } from './views/ScheduleView';
import { GalleryView } from './views/GalleryView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';

// Modals
import { BookingModal } from './components/BookingModal';
import { ProgramModal } from './components/ProgramModal';
import { TrainerModal } from './components/TrainerModal';
import { BlogModal } from './components/BlogModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { JoinModal } from './components/JoinModal';
import { AdminBookingsModal } from './components/AdminBookingsModal';

// Data
import { PROGRAMS, TRAINERS, BLOG_POSTS, GALLERY_ITEMS, Program, Trainer, BlogPost, GalleryItem } from './data/gymData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingClassId, setBookingClassId] = useState<string | undefined>();
  const [bookingTrainerId, setBookingTrainerId] = useState<string | undefined>();
  const [isAdminBookingsOpen, setIsAdminBookingsOpen] = useState(false);

  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);

  const [isTrainerOpen, setIsTrainerOpen] = useState(false);
  const [activeTrainer, setActiveTrainer] = useState<Trainer | null>(null);

  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinTier, setJoinTier] = useState<string>('STANDARD');

  // Sync hash on initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'about', 'programs', 'trainers', 'membership', 'schedule', 'gallery', 'blog', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  // Handlers for Modals
  const handleOpenBooking = (classId?: string, trainerId?: string) => {
    setBookingClassId(classId);
    setBookingTrainerId(trainerId);
    setIsBookingOpen(true);
  };

  const handleOpenProgram = (programId: string) => {
    const found = PROGRAMS.find((p) => p.id === programId) || PROGRAMS[0];
    setActiveProgram(found);
    setIsProgramOpen(true);
  };

  const handleOpenTrainer = (trainerId: string) => {
    const found = TRAINERS.find((t) => t.id === trainerId) || TRAINERS[0];
    setActiveTrainer(found);
    setIsTrainerOpen(true);
  };

  const handleOpenBlog = (post: BlogPost) => {
    setActiveBlogPost(post);
    setIsBlogOpen(true);
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setIsLightboxOpen(true);
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleOpenJoin = (tier = 'STANDARD') => {
    setJoinTier(tier);
    setIsJoinOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#e2e8f0]">
      {/* Sticky Professional Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenJoinModal={handleOpenJoin}
        onOpenAdminBookings={() => setIsAdminBookingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenProgram={handleOpenProgram}
            onOpenTrainer={handleOpenTrainer}
            onOpenJoin={handleOpenJoin}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenTrainer={handleOpenTrainer}
            onOpenJoin={handleOpenJoin}
          />
        )}

        {currentPage === 'programs' && (
          <ProgramsView
            onOpenProgram={handleOpenProgram}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'trainers' && (
          <TrainersView
            onOpenTrainer={handleOpenTrainer}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'membership' && (
          <MembershipView
            onOpenJoin={handleOpenJoin}
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'schedule' && (
          <ScheduleView onOpenBooking={handleOpenBooking} />
        )}

        {currentPage === 'gallery' && (
          <GalleryView onOpenLightbox={handleOpenLightbox} />
        )}

        {currentPage === 'blog' && (
          <BlogView onOpenArticle={handleOpenBlog} />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Global Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedClassId={bookingClassId}
        preselectedTrainerId={bookingTrainerId}
      />

      <ProgramModal
        program={activeProgram}
        isOpen={isProgramOpen}
        onClose={() => setIsProgramOpen(false)}
        onBookProgram={(programId) => handleOpenBooking(undefined, programId)}
      />

      <TrainerModal
        trainer={activeTrainer}
        isOpen={isTrainerOpen}
        onClose={() => setIsTrainerOpen(false)}
        onBookTrainer={(trainerId) => handleOpenBooking(undefined, trainerId)}
      />

      <BlogModal
        post={activeBlogPost}
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
      />

      <GalleryLightbox
        item={GALLERY_ITEMS[lightboxIndex]}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />

      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        initialTier={joinTier}
      />

      <AdminBookingsModal
        isOpen={isAdminBookingsOpen}
        onClose={() => setIsAdminBookingsOpen(false)}
      />

      {/* Quiet Authority Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenJoinModal={handleOpenJoin}
        onOpenAdminBookings={() => setIsAdminBookingsOpen(true)}
      />
    </div>
  );
}
