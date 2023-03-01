import { Champions } from "./Champions"
import { Classification } from "./Classification"

export function LastSection() {
        return (
            <div id="board" className="h-screen relative">
                <div className="last-section-container flex text-center justify-around ">
                <Classification />
                <Champions />
                </div>
            </div>
        )
}