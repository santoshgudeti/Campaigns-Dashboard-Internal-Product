import { Campaign } from '../../types/campaign';

interface CampaignCardProps {
    campaign: Campaign;
}

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function getStatusColor(status: string): string {
    return status === 'Active'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-surface-50 text-surface-600 border-surface-200';
}

function getNicheColor(niche: string): string {
    const colors: Record<string, string> = {
        Fintech: 'bg-blue-50 text-blue-700 border-blue-200',
        Health: 'bg-rose-50 text-rose-700 border-rose-200',
        Ecommerce: 'bg-amber-50 text-amber-700 border-amber-200',
        Education: 'bg-violet-50 text-violet-700 border-violet-200',
        SaaS: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        Travel: 'bg-teal-50 text-teal-700 border-teal-200',
    };
    return colors[niche] || 'bg-surface-50 text-surface-700 border-surface-200';
}

function getProgressColor(progress: number): string {
    if (progress >= 80) return 'from-emerald-400 to-emerald-600';
    if (progress >= 50) return 'from-primary-400 to-primary-600';
    if (progress >= 30) return 'from-amber-400 to-amber-500';
    return 'from-surface-300 to-surface-400';
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
    const isArchived = campaign.status === 'Completed';

    return (
        <div
            id={`campaign-card-${campaign.id}`}
            className="group bg-white rounded-2xl border border-surface-200/60 shadow-card hover:shadow-card-hover 
        transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden animate-fade-in"
        >
            {/* Card Header */}
            <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-surface-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {campaign.title}
                    </h3>
                    <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                    </span>
                </div>

                <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${getNicheColor(campaign.niche)}`}>
                    {campaign.niche}
                </span>
            </div>

            {/* Stats */}
            <div className="px-5 py-3 grid grid-cols-3 gap-3 border-t border-surface-100">
                <div>
                    <p className="text-xs text-surface-400 font-medium mb-0.5">Impressions</p>
                    <p className="text-sm font-bold text-surface-800">{formatNumber(campaign.impressions)}</p>
                </div>
                <div>
                    <p className="text-xs text-surface-400 font-medium mb-0.5">Clicks</p>
                    <p className="text-sm font-bold text-surface-800">{formatNumber(campaign.clicks)}</p>
                </div>
                <div>
                    <p className="text-xs text-surface-400 font-medium mb-0.5">Conv. Rate</p>
                    <p className="text-sm font-bold text-surface-800">{campaign.conversionRate}%</p>
                </div>
            </div>

            {/* Progress + CTA */}
            <div className="px-5 pb-5 pt-3">
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-surface-500">Progress</span>
                        <span className="text-xs font-bold text-surface-700">{campaign.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(campaign.progress)} transition-all duration-700 ease-out`}
                            style={{ width: `${campaign.progress}%` }}
                        />
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    id={`view-details-${campaign.id}`}
                    disabled={isArchived}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isArchived
                            ? 'bg-surface-100 text-surface-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-sm hover:shadow-md active:scale-[0.98]'
                        }`}
                >
                    {isArchived ? 'Archived' : 'View Details'}
                </button>
            </div>
        </div>
    );
}
