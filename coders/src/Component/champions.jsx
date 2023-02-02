import { ChampionsCard } from "./ChampionsCard";

export function Champions() {
        return (
            <div className=' champion-section h-screen relative text-center'>
                    <div className="champion-content flex flex-col gap-10 absolute-traslate">
                       <ChampionsCard />
                    </div>
                    <div className="champion-title absolute-traslate ">
                        <div>
                            <h2>Champions</h2>
                        </div>
                    </div>
            </div>
        )
}