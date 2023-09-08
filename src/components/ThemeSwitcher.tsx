import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { Palette, Droplets, Minimize, Maximize, Languages } from "lucide-react";
import { ThemeName } from "@/types";

const ThemeSwitcher: React.FC = () => {
    const { setTheme, currentTheme, showWaterDrop, setShowWaterDrop, waterDropSize, setWaterDropSize } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const themeOptions: { name: ThemeName; color: string }[] = [
        { name: 'spring', color: 'bg-teal-400' },
        { name: 'summer', color: 'bg-blue-400' },
        { name: 'autumn', color: 'bg-orange-400' },
        { name: 'winter', color: 'bg-indigo-400' },
        { name: 'dark', color: 'bg-slate-800 border border-gray-500' },
    ];

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${currentTheme.colors.accentBg} w-14 h-14 rounded-full flex items-center justify-center shadow-xl ${currentTheme.colors.shadow} hover:-translate-y-1 transition-transform`}
            >
                <Palette size={24} />
            </button>

            {/* Settings Panel */}
            <div className={`
        absolute bottom-full right-0 mb-6 p-5 
        bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl 
        border border-white/50 
        flex flex-col gap-5 
        w-72
        origin-bottom-right transition-all duration-200
        ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
        z-50
      `}>

                {/* Section: Colors */}
                <div>
                    <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t('settings.theme')}</div>
                    <div className="flex flex-wrap gap-2">
                        {themeOptions.map((t) => (
                            <button
                                key={t.name}
                                onClick={() => setTheme(t.name)}
                                className={`w-8 h-8 rounded-full ${t.color} border-2 ${currentTheme.name === t.name ? 'border-gray-600 scale-110' : 'border-transparent hover:scale-110'} transition-all`}
                                title={t.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-200 w-full" />

                {/* Section: Language */}
                <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Languages size={16} className="text-gray-400" />
                        <span>{t('settings.language')}</span>
                    </div>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setLanguage('zh')}
                            className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${language === 'zh' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            中文
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            English
                        </button>
                    </div>
                </div>

                <div className="h-px bg-gray-200 w-full" />

                {/* Section: Water Drop */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Droplets size={16} className={showWaterDrop ? 'text-blue-500' : 'text-gray-400'} />
                            <span>{t('settings.waterDrop')}</span>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            onClick={() => setShowWaterDrop(!showWaterDrop)}
                            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${showWaterDrop ? currentTheme.colors.accentBg : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow transition-transform duration-300 ${showWaterDrop ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {showWaterDrop && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-500">
                                <Minimize size={12} />
                                <span>{t('settings.size')}</span>
                                <Maximize size={12} />
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="500"
                                step="10"
                                value={waterDropSize}
                                onChange={(e) => setWaterDropSize(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ThemeSwitcher;
