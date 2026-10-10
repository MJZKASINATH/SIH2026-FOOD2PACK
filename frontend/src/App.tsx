import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { NewAssessmentWizard } from './components/NewAssessmentWizard';
import { RecommendationPage } from './components/RecommendationPage';
import { StressTestPage } from './components/StressTestPage';
import { KnowledgeBasePage } from './components/KnowledgeBasePage';
import { PackagingMaterialsPage } from './components/PackagingMaterialsPage';
import { AssessmentHistoryPage } from './components/AssessmentHistoryPage';
import { MethodologyPage } from './components/MethodologyPage';
import { AboutModal } from './components/AboutModal';

import type { AssessmentRequest, PackagingRecommendation, FoodProfile, JourneyProfile } from './types';
import { submitAssessment } from './api';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Assessment & Stress Test Shared State
  const [recommendation, setRecommendation] = useState<PackagingRecommendation | null>(null);
  const [currentFoodProfile, setCurrentFoodProfile] = useState<FoodProfile | undefined>(undefined);
  const [currentBaselineJourney, setCurrentBaselineJourney] = useState<JourneyProfile | undefined>(undefined);

  // Quick Launcher commodity state
  const [selectedCommodityForWizard, setSelectedCommodityForWizard] = useState<string>('Tomato');

  const handleStartAssessment = (commodityName?: string) => {
    if (commodityName) {
      setSelectedCommodityForWizard(commodityName);
    }
    setActiveTab('new-assessment');
  };

  const handleAssessmentComplete = async (request: AssessmentRequest) => {
    setCurrentFoodProfile(request.food_profile);
    setCurrentBaselineJourney(request.journey_profile);

    // Call REST API engine
    const rec = await submitAssessment(request);
    setRecommendation(rec);

    // Navigate to Recommendation page
    setActiveTab('recommendation');
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Desktop Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="p-6 max-w-7xl mx-auto w-full flex-1">
          {activeTab === 'landing' && (
            <LandingPage
              onStartAssessment={() => handleStartAssessment('Tomato')}
              onExploreMethodology={() => setActiveTab('methodology')}
              onOpenStressTest={() => setActiveTab('stress-test')}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              onStartAssessment={(commodity) => handleStartAssessment(commodity)}
              onViewRecommendation={() => setActiveTab('recommendation')}
              onOpenStressTest={() => setActiveTab('stress-test')}
              onOpenKnowledgeBase={() => setActiveTab('knowledge-base')}
            />
          )}

          {activeTab === 'new-assessment' && (
            <NewAssessmentWizard
              initialCommodity={selectedCommodityForWizard}
              onComplete={handleAssessmentComplete}
            />
          )}

          {activeTab === 'recommendation' && (
            <RecommendationPage
              recommendation={recommendation}
              onOpenStressTest={() => setActiveTab('stress-test')}
              onNewAssessment={() => handleStartAssessment('Tomato')}
            />
          )}

          {activeTab === 'stress-test' && (
            <StressTestPage
              currentFoodProfile={currentFoodProfile}
              currentBaselineJourney={currentBaselineJourney}
            />
          )}

          {activeTab === 'knowledge-base' && (
            <KnowledgeBasePage />
          )}

          {activeTab === 'materials' && (
            <PackagingMaterialsPage />
          )}

          {activeTab === 'history' && (
            <AssessmentHistoryPage
              onViewRecommendation={() => setActiveTab('recommendation')}
              onOpenStressTest={() => setActiveTab('stress-test')}
            />
          )}

          {activeTab === 'methodology' && (
            <MethodologyPage />
          )}
        </main>
      </div>

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

export default App;
