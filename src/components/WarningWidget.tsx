import React from 'react';
import { EarthquakeWarning } from '../types';
import { AlertCircle, MapPin, Activity, Clock } from 'lucide-react';
import { generateBMKGImageUrl } from '../../lib/utils';
import { motion } from 'motion/react';

interface WarningWidgetProps {
  warning: EarthquakeWarning | null;
}

export function WarningWidget({ warning }: WarningWidgetProps) {
  if (!warning?.Infogempa?.gempa) {
    return (
      <div className="w-full h-full min-h-[200px] flex items-center justify-center flex-col text-center">
        <Activity className="w-8 h-8 text-[#A67B5B] mb-2 opacity-50" />
        <p className="text-sm font-medium text-[#7C7A76] dark:text-[#A09E9A]">Memuat Peringatan Dini...</p>
      </div>
    );
  }

  const { gempa } = warning.Infogempa;
  const isHighMagnitude = parseFloat(gempa.Magnitude) >= 5.0;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E8E4D9] dark:bg-[#34332F] flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-[#C96868]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#7C7A76] dark:text-[#A09E9A]">Info BMKG Terkini</h3>
          <p className="text-lg font-semibold text-[#4A4A4A] dark:text-[#E8E4D9]">Peringatan Gempa</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 flex-col sm:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-3">
             <Activity className="w-5 h-5 mt-0.5 text-[#A67B5B] dark:text-[#D2B48C]" />
             <div>
               <p className="text-sm text-[#7C7A76] dark:text-[#A09E9A]">Magnitudo</p>
               <p className={`text-2xl font-bold ${isHighMagnitude ? 'text-[#C96868]' : 'text-[#4A4A4A] dark:text-[#E8E4D9]'}`}>
                 {gempa.Magnitude} SR
               </p>
             </div>
          </div>
          
          <div className="flex items-start gap-3">
             <MapPin className="w-5 h-5 mt-0.5 text-[#A67B5B] dark:text-[#D2B48C]" />
             <div>
               <p className="text-sm text-[#7C7A76] dark:text-[#A09E9A]">Wilayah</p>
               <p className="text-base font-medium text-[#4A4A4A] dark:text-[#E8E4D9] leading-snug">
                 {gempa.Wilayah}
               </p>
             </div>
          </div>

          <div className="flex items-start gap-3">
             <Clock className="w-5 h-5 mt-0.5 text-[#A67B5B] dark:text-[#D2B48C]" />
             <div>
               <p className="text-sm text-[#7C7A76] dark:text-[#A09E9A]">Waktu</p>
               <p className="text-base font-medium text-[#4A4A4A] dark:text-[#E8E4D9]">
                 {gempa.Tanggal}, {gempa.Jam}
               </p>
             </div>
          </div>
        </div>

        {gempa.Shakemap && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden border border-[#E8E4D9] dark:border-[#3A3834] bg-[#E8E4D9] dark:bg-[#34332F] flex-shrink-0"
          >
            <img 
              src={generateBMKGImageUrl(gempa.Shakemap)} 
              alt="Shakemap Gempa BMKG" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[#E8E4D9] dark:border-[#3A3834]">
        <p className="text-sm font-medium text-[#C96868]">
          Potensi: {gempa.Potensi}
        </p>
      </div>
    </div>
  );
}
