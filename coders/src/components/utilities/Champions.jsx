import { ChampionsCard } from "./ChampionsCard";

export function Champions() {
        return (
            <div className='champion-section text-center relative' id="champions">
                    <div className="champion-title">
                        <h2>Collection</h2>
                    </div>
                    <div className="champion-content">
                       <ChampionsCard />
                    </div>
            </div>
        )
}