(() => {
  const toast = document.getElementById('toast');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  };

  const inViewport = (el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const sticky = document.getElementById('stickyCta');
  const stickyTarget = document.querySelector(
    document.body.classList.contains('cash-offer-page') ? '#lookup' : '#dealer-signup'
  );

  const toggleSticky = () => {
    if (!sticky) return;
    const smallScreen = window.matchMedia('(max-width: 720px)').matches;
    const scrolled = window.scrollY > 320;
    const hideBecauseTargetVisible = stickyTarget && inViewport(stickyTarget);
    sticky.classList.toggle('show', smallScreen && scrolled && !hideBecauseTargetVisible);
  };

  window.addEventListener('scroll', toggleSticky, { passive: true });
  window.addEventListener('resize', toggleSticky);
  toggleSticky();

  const bindStaticForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (event) => {
      const action = (form.getAttribute('action') || '').trim();
      if (!action) {
        event.preventDefault();
        showToast('Form is not connected yet. Add your form endpoint to the action attribute or replace the form with your embed code.');
      }
    });
  };

  bindStaticForm('dealerForm');

  const lookupForm = document.getElementById('lookupForm');
  const resultSection = document.getElementById('vehicleResult');
  const contactSection = document.getElementById('contactSection');
  const successSection = document.getElementById('successSection');
  const cashOfferForm = document.getElementById('cashOfferForm');
  const editLookupButton = document.getElementById('editLookup');

  const fields = {
    vehicleBrand: document.getElementById('vehicleBrand'),
    vehicleTitle: document.getElementById('vehicleTitle'),
    vehicleSubtitle: document.getElementById('vehicleSubtitle'),
    plateDisplay: document.getElementById('plateDisplay'),
    mileageDisplay: document.getElementById('mileageDisplay'),
    detailFuel: document.getElementById('detailFuel'),
    detailBody: document.getElementById('detailBody'),
    detailColour: document.getElementById('detailColour'),
    detailTransmission: document.getElementById('detailTransmission'),
    detailRegistered: document.getElementById('detailRegistered'),
    detailMot: document.getElementById('detailMot'),
    hiddenReg: document.getElementById('hiddenReg'),
    hiddenMileage: document.getElementById('hiddenMileage'),
    hiddenVehicle: document.getElementById('hiddenVehicle')
  };

  const formatNumber = (value) => {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number.toLocaleString('en-GB') : value;
  };

  const normaliseReg = (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  const formatReg = (value) => {
    const reg = normaliseReg(value);
    if (reg.length <= 4) return reg;
    return `${reg.slice(0, 4)} ${reg.slice(4)}`;
  };

  const knownVehicles = {
    LA17XPM: {
      brand: 'TESLA',
      title: 'Tesla Model X',
      subtitle: '90D (Dual Motor) SUV 5dr Electric Auto 4WDE (417 bhp)',
      fuel: 'Electric',
      body: 'SUV',
      colour: 'Silver',
      transmission: 'Automatic',
      registered: '23 August 2017',
      mot: '07 March 2027'
    },
    LB21TES: {
      brand: 'TESLA',
      title: 'Tesla Model 3',
      subtitle: 'Long Range Saloon 4dr Electric Auto AWD (346 bhp)',
      fuel: 'Electric',
      body: 'Saloon',
      colour: 'White',
      transmission: 'Automatic',
      registered: '18 March 2021',
      mot: '17 March 2027'
    },
    YA22TES: {
      brand: 'TESLA',
      title: 'Tesla Model Y',
      subtitle: 'Long Range SUV 5dr Electric Auto AWD (384 bhp)',
      fuel: 'Electric',
      body: 'SUV',
      colour: 'Black',
      transmission: 'Automatic',
      registered: '12 September 2022',
      mot: '11 September 2028'
    }
  };

  const inferVehicle = (reg) => {
    const cleaned = normaliseReg(reg);
    if (knownVehicles[cleaned]) {
      return knownVehicles[cleaned];
    }

    if (cleaned.includes('Y')) {
      return {
        brand: 'TESLA',
        title: 'Tesla Model Y',
        subtitle: 'Long Range SUV 5dr Electric Auto AWD',
        fuel: 'Electric',
        body: 'SUV',
        colour: 'Black',
        transmission: 'Automatic',
        registered: 'UK registration on file',
        mot: 'MOT date to verify'
      };
    }

    if (cleaned.includes('S')) {
      return {
        brand: 'TESLA',
        title: 'Tesla Model S',
        subtitle: 'Dual Motor Hatchback 5dr Electric Auto AWD',
        fuel: 'Electric',
        body: 'Hatchback',
        colour: 'Grey',
        transmission: 'Automatic',
        registered: 'UK registration on file',
        mot: 'MOT date to verify'
      };
    }

    if (cleaned.includes('X')) {
      return {
        brand: 'TESLA',
        title: 'Tesla Model X',
        subtitle: 'Dual Motor SUV 5dr Electric Auto AWD',
        fuel: 'Electric',
        body: 'SUV',
        colour: 'Grey',
        transmission: 'Automatic',
        registered: 'UK registration on file',
        mot: 'MOT date to verify'
      };
    }

    return {
      brand: 'TESLA',
      title: 'Tesla Model 3',
      subtitle: 'Electric Auto Tesla (UK lookup preview)',
      fuel: 'Electric',
      body: 'Saloon',
      colour: 'White',
      transmission: 'Automatic',
      registered: 'UK registration on file',
      mot: 'MOT date to verify'
    };
  };

  const populateVehicle = ({ reg, mileage, vehicle }) => {
    if (!fields.vehicleTitle) return;

    fields.vehicleBrand.textContent = vehicle.brand;
    fields.vehicleTitle.textContent = vehicle.title;
    fields.vehicleSubtitle.textContent = vehicle.subtitle;
    fields.plateDisplay.textContent = formatReg(reg);
    fields.mileageDisplay.textContent = formatNumber(mileage);
    fields.detailFuel.textContent = vehicle.fuel;
    fields.detailBody.textContent = vehicle.body;
    fields.detailColour.textContent = vehicle.colour;
    fields.detailTransmission.textContent = vehicle.transmission;
    fields.detailRegistered.textContent = vehicle.registered;
    fields.detailMot.textContent = vehicle.mot;

    if (fields.hiddenReg) fields.hiddenReg.value = formatReg(reg);
    if (fields.hiddenMileage) fields.hiddenMileage.value = mileage;
    if (fields.hiddenVehicle) fields.hiddenVehicle.value = `${vehicle.title} | ${vehicle.subtitle}`;
  };

  if (lookupForm) {
    lookupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const regInput = lookupForm.querySelector('#reg');
      const mileageInput = lookupForm.querySelector('#mileage');
      const reg = (regInput?.value || '').trim();
      const mileage = (mileageInput?.value || '').trim();

      if (!normaliseReg(reg) || !mileage) {
        showToast('Enter a UK registration and current mileage to continue.');
        return;
      }

      const vehicle = inferVehicle(reg);
      populateVehicle({ reg, mileage, vehicle });

      resultSection?.classList.remove('is-hidden');
      contactSection?.classList.remove('is-hidden');
      successSection?.classList.add('is-hidden');
      contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (editLookupButton) {
    editLookupButton.addEventListener('click', () => {
      document.getElementById('lookup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('reg')?.focus();
    });
  }

  if (cashOfferForm) {
    cashOfferForm.addEventListener('submit', (event) => {
      const action = (cashOfferForm.getAttribute('action') || '').trim();
      if (!action) {
        event.preventDefault();
        successSection?.classList.remove('is-hidden');
        successSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast('Demo mode: connect the cash-offer form to your endpoint when ready.');
      }
    });
  }
})();
