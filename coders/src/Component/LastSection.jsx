import { Champions } from "./Champions"
import { Classification } from "./Classification"

export function LastSection() {
        return (
            <div className="h-screen relative text-center">
                <div className="last-section-container flex justify-between p-8">
                <Classification />
                <Champions />
                </div>
            </div>
        )
}