'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useSignupMutation, usePatchMeMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/features/authSlice';
import {
  useGetClubsQuery,
  useGetPlayingStylesQuery,
  useGetProfessionalLevelsQuery,
  useGetSportsQuery,
} from '@/redux/api/globalApi';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import RedirectingModal from '@/components/shared/redirecting-modal';
import 'react-range-slider-input/dist/style.css';

// Modal for selecting user preferences post-signup
const PreferenceModal = ({
  openPreference,
  setOpenPreference,
  userData,
  role,
  referral_code,
  onCoachSignup,
}: {
  openPreference: boolean;
  setOpenPreference: Dispatch<SetStateAction<boolean>>;
  userData: { name: string; email: string; password: string };
  role: string;
  referral_code?: string;
  onCoachSignup?: () => void;
}) => {
  // Use slug arrays for selection
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedProfessionalLevels, setSelectedProfessionalLevels] = useState<string[]>([]);
  const [selectedPlayingStyles, setSelectedPlayingStyles] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [teamSearch, setTeamSearch] = useState('');

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [patchMe, { isLoading: isPatching }] = usePatchMeMutation();
  const isLoading = isSigningUp || isPatching;

  // Fetch data
  const { data: sportsData } = useGetSportsQuery();
  const { data: levelsData } = useGetProfessionalLevelsQuery();
  const { data: stylesData } = useGetPlayingStylesQuery();
  const { data: teamsData } = useGetClubsQuery(teamSearch); // pass search term if needed

  // Helper to toggle selection by slug
  const toggleSelection = (
    slug: string,
    set: Dispatch<SetStateAction<string[]>>
  ) => {
    set([slug]);
  };

  const handleSignup = async () => {
    try {
      const finalSportSlug = selectedSports[0] || 'baseball';
      const finalLevelSlug = selectedProfessionalLevels[0] || 'beginner';
      const finalStyleSlug = selectedPlayingStyles[0] || 'forward';
      const finalTeamSlug = selectedTeams[0] || 'real-madrid';

      const roleSlug = role ? role.toUpperCase() : 'PLAYER';
      // If role is an object in some contexts, ensure we treat it right, but here 'role' comes from prop.

      const res = await signup({
        ...userData,
        role: roleSlug,
        club_slug: finalTeamSlug,
        sport_slug: finalSportSlug,
        playing_style_slug: finalStyleSlug,
        professional_level_slug: finalLevelSlug,
        referral_code: referral_code || undefined,
      }).unwrap();

      // Store credentials (tokens and initial user data)
      dispatch(setCredentials(res));

      if (roleSlug === 'COACH') {
        onCoachSignup?.();
        setOpenPreference(false);
      } else {
        // For Players, update preferences via patchMe
        const patchData = {
          club_slug: finalTeamSlug,
          sport_slug: finalSportSlug,
          playing_style_slug: [finalStyleSlug], // Array as per report
          professional_level_slug: finalLevelSlug,
        };
        await patchMe(patchData).unwrap();
        router.push('/login');
        setOpenPreference(false);
      }
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  // Helper options extractors
  const sportsOptions = sportsData?.results || [];
  const levelsOptions = levelsData?.results || [];
  const stylesOptions = stylesData?.results || [];
  const teamsOptions = teamsData?.results || [];

  return (
    <>
    <Dialog open={openPreference} onOpenChange={setOpenPreference}>
      <DialogContent className="sm:max-w-170" showCloseButton={false}>
        <div className="flex flex-col gap-10 max-h-[80vh] overflow-y-auto px-1">
          <DialogHeader>
            <DialogTitle>Choose your preferences</DialogTitle>
            <DialogDescription>Personalise your feed according to your needs</DialogDescription>
          </DialogHeader>

          <FilterGroup
            title="Sports"
            options={sportsOptions}
            selectedSlugs={selectedSports}
            onSelect={(slug) => toggleSelection(slug, setSelectedSports)}
          />

          <FilterGroup
            title="Professional Level"
            options={levelsOptions}
            selectedSlugs={selectedProfessionalLevels}
            onSelect={(slug) => toggleSelection(slug, setSelectedProfessionalLevels)}
          />

          <FilterGroup
            title="Playing Style"
            options={stylesOptions}
            selectedSlugs={selectedPlayingStyles}
            onSelect={(slug) => toggleSelection(slug, setSelectedPlayingStyles)}
          />

          <div className="space-y-6">
            <h3 className="text-black-12 text-xl font-semibold md:text-2xl">Teams</h3>

            <div className="border-black-5 flex h-14 items-center gap-1.5 rounded-full border p-4">
              <Icon name="search" height={24} width={24} className="text-black-6 shrink-0" />
              <input
                type="text"
                className="text-black-10 placeholder:text-black-6 flex-1 border-0 text-base outline-0"
                placeholder="Search by team name or location"
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {teamsOptions.map((team) => {
                const isSelected = selectedTeams.includes(team.slug);
                return (
                  <button
                    key={team.slug}
                    onClick={() => toggleSelection(team.slug, setSelectedTeams)}
                    className={cn(
                      'flex h-14 cursor-pointer items-center gap-2 rounded-full px-8 text-lg hover:opacity-80 transition-colors',
                      isSelected
                        ? 'bg-[#212121] text-white font-semibold'
                        : 'border border-black-5 text-black-8 hover:bg-black-4'
                    )}
                  >
                    {team.title}
                  </button>
                );
              })}
            </div>
          </div>

          <Button size={'lg'} className="w-full" disabled={isLoading} onClick={handleSignup}>
            {isLoading ? 'Creating Account...' : 'Discover your feed'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    {/* No longer rendering RedirectingModal here, parent will handle it */}
  </>
  );
};

export default PreferenceModal;

type Option = { slug: string; title: string };

type FilterGroupProps = {
  title: string;
  options: Option[];
  selectedSlugs: string[];
  onSelect: (slug: string) => void;
};

const FilterGroup = ({ title, options, selectedSlugs, onSelect }: FilterGroupProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-black-12 text-xl font-semibold md:text-2xl">{title}</h3>

      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isActive = selectedSlugs.includes(option.slug);

          return (
            <button
              key={option.slug}
              onClick={() => onSelect(option.slug)}
              className={cn(
                'flex h-14 cursor-pointer items-center rounded-full px-8 text-lg transition-colors',
                isActive
                  ? 'bg-[#212121] font-semibold text-white'
                  : 'border-black-5 text-black-8 hover:bg-black-4 border'
              )}
            >
              {option.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
