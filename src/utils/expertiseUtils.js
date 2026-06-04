const EXPERTISE_COST_BY_LEVEL = {
  1: { baseCost: 500, multiplier: 1.0, description: 'Temel ekspertiz' },
  2: { baseCost: 500, multiplier: 1.25, description: 'Detaylı ekspertiz' },
  3: { baseCost: 500, multiplier: 1.5, description: 'Premium ekspertiz' },
  4: { baseCost: 500, multiplier: 1.75, description: 'VIP ekspertiz' },
};

const calculateExpertiseCost = (userLevel) => {
  const expertiseData = EXPERTISE_COST_BY_LEVEL[userLevel] || EXPERTISE_COST_BY_LEVEL[1];
  return Math.floor(expertiseData.baseCost * expertiseData.multiplier);
};

const EXPERTISE_RESULTS = {
  CLEAN: {
    status: 'Temiz',
    bargainAdjustment: 0.20,
    description: 'Sorun yok, mükemmel durum',
    icon: '✅',
  },
  MINOR_DAMAGE: {
    status: 'Küçük Hasar',
    bargainAdjustment: 0.25,
    description: 'Ufak çizikler, kozmetik hasar',
    icon: '⚠️',
  },
  MODERATE_DAMAGE: {
    status: 'Orta Hasar',
    bargainAdjustment: 0.30,
    description: 'Onarım gerekli, motor sorun yok',
    icon: '⚠️⚠️',
  },
  SEVERE_DAMAGE: {
    status: 'Ciddi Hasar',
    bargainAdjustment: 0.35,
    description: 'Motor problemi veya ciddi hasar',
    icon: '❌',
  },
};

export { calculateExpertiseCost, EXPERTISE_RESULTS, EXPERTISE_COST_BY_LEVEL };
