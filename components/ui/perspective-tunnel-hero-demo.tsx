import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";

export default function DemoPerspectiveTunnel() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-stone-100 dark:bg-stone-950 p-4 sm:p-6 md:p-8 transition-colors duration-300">
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
                <PerspectiveTunnelHero height="80vh" />
            </div>
        </main>
    );
}
