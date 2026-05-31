// --- SMART POLICY FINDER LOGIC ---
let selectedCategoryValue = '';
let selectedTargetValue = '';
let selectedObjectiveValue = '';
let selectedBudgetValue = '';

window.selectCategory = function (category, btnEl) {
    selectedCategoryValue = category;

    const licOpts = document.getElementById('objective-lic-options');
    const healthOpts = document.getElementById('objective-health-options');
    if (category === 'health') {
        licOpts.style.display = 'none';
        healthOpts.style.display = 'flex';
    } else {
        licOpts.style.display = 'flex';
        healthOpts.style.display = 'none';
    }

    document.querySelectorAll('#step1 .option-btn').forEach(btn => btn.classList.remove('selected'));
    btnEl.classList.add('selected');
    setTimeout(() => switchStep(1, 2), 350);
}

window.selectTarget = function (target, btnEl) {
    selectedTargetValue = target;
    document.querySelectorAll('#step2 .option-btn').forEach(btn => btn.classList.remove('selected'));
    btnEl.classList.add('selected');
    setTimeout(() => switchStep(2, 3), 350);
}

window.selectObjective = function (objective, btnEl) {
    selectedObjectiveValue = objective;
    document.querySelectorAll('#step3 .option-btn').forEach(btn => btn.classList.remove('selected'));
    btnEl.classList.add('selected');
    setTimeout(() => switchStep(3, 4), 350);
}

window.selectBudget = function (budget, btnEl) {
    selectedBudgetValue = budget;
    document.querySelectorAll('#step4 .option-btn').forEach(btn => btn.classList.remove('selected'));
    btnEl.classList.add('selected');
    setTimeout(showResults, 350);
}

function switchStep(from, to) {
    document.getElementById(`step${from}`).classList.remove('active');
    document.getElementById(`step${to}`).classList.add('active');
}

window.prevStep = function () {
    const currentActiveStep = document.querySelector('.finder-step.active');
    const id = currentActiveStep.id;

    if (id === 'step2') switchStep(2, 1);
    if (id === 'step3') switchStep(3, 2);
    if (id === 'step4') switchStep(4, 3);
}

function showResults() {
    document.getElementById('step4').classList.remove('active');

    const rTitle = document.getElementById('recommendedPlan');
    const rDesc = document.getElementById('recommendedDesc');

    let planName = '';
    let planDesc = '';

    if (selectedCategoryValue === 'health') {
        if (selectedTargetValue === 'senior' || selectedObjectiveValue === 'senior_health') {
            planName = 'Senior Citizens Red Carpet (Star Health)';
            planDesc = 'Outstanding medical support for seniors (aged 60-75). Covers pre-existing diseases, outpatient consultations, and checkups without requiring pre-insurance medical screenings.';
        } else if (selectedObjectiveValue === 'health_maternity') {
            if (selectedTargetValue === 'individual' || selectedTargetValue === 'couple') {
                planName = 'Women Care Plan (Star Health)';
                planDesc = 'Specialized health cover for women aged 18-75. Includes comprehensive maternity care, IVF/assisted reproduction cover, bariatric surgery, and a lump-sum payout on cancer diagnosis.';
            } else {
                planName = 'Health Assure Plan (Star Health)';
                planDesc = 'Versatile health shield covering up to 9 family members. Includes Day-1 maternity cover, newborn hospitalization, wellness discounts, and automatic sum insured restoration.';
            }
        } else if (selectedObjectiveValue === 'health_young') {
            planName = 'Young Star Plan (Star Health)';
            planDesc = 'Tailored for young adults (18-40) seeking cost-effective coverage. Requires zero pre-insurance medical screening and provides a 25% sum insured bonus for road traffic accidents.';
        } else if (selectedObjectiveValue === 'health_topup') {
            planName = 'Super Surplus Gold (Star Health)';
            planDesc = 'Premium super top-up coverage providing up to ₹1 Crore extra cover over your primary policy deductible. Includes modern treatments and air ambulance benefits.';
        } else if (selectedTargetValue === 'family' || selectedObjectiveValue === 'health_comprehensive') {
            planName = 'Star Comprehensive Plan';
            planDesc = 'Ultimate zero-copay health protection. Covers air ambulance, OPD benefits, dental and ophthalmic treatments, and newborn hospital charges.';
        } else {
            planName = 'Super Star (Preferred) (Star Health)';
            planDesc = 'Features a unique "Freeze Your Age" premium-lock benefit. Outpatient coverage, zero room rent limits, and 21 optional rider add-ons.';
        }
    } else if (selectedCategoryValue === 'lic') {
        if (selectedObjectiveValue === 'retirement') {
            if (selectedTargetValue === 'senior') {
                planName = 'LIC Saral Pension (Plan No. 862)';
                planDesc = 'Highly straightforward immediate pension plan. Offers guaranteed lifelong regular income with a 100% refund of the purchase price to family members.';
            } else if (selectedBudgetValue === 'high') {
                planName = 'LIC Jeevan Utsav (Plan No. 871)';
                planDesc = 'Elite whole-life plan with a short premium term. Offers a guaranteed 10% annual income payout starting after premium payments, combined with lifetime cover.';
            } else {
                planName = 'LIC Jeevan Shanti (Plan No. 858)';
                planDesc = 'Guaranteed deferred annuity plan. Accrues high compounding addition rates during deferment, translating to a highly competitive, secure retirement pension.';
            }
        } else if (selectedObjectiveValue === 'child') {
            if (selectedBudgetValue === 'high') {
                planName = 'LIC Amritbaal (Plan No. 874)';
                planDesc = 'Elite child insurance offering a guaranteed addition of ₹80 per ₹1,000 sum insured. Designed specifically to fund university education and major child life stages.';
            } else {
                planName = 'LIC Jeevan Tarun (Plan No. 834)';
                planDesc = 'Highly flexible savings-cum-protection plan for children. Outlines modular options for survival benefits between ages 20-24, with full maturity at age 25.';
            }
        } else if (selectedObjectiveValue === 'wealth') {
            if (selectedTargetValue === 'couple') {
                planName = 'LIC New Jeevan Sathi (Plan No. 889)';
                planDesc = 'Unique joint-life protection for husband and wife. Features automatic premium waiver benefits on the first partner\'s demise while keeping the other covered.';
            } else if (selectedBudgetValue === 'high') {
                planName = 'LIC Jeevan Labh (Plan No. 836)';
                planDesc = 'Limited premium payment endowment plan with the highest maturity returns. Offers strong savings accumulation alongside comprehensive risk cover.';
            } else if (selectedBudgetValue === 'low') {
                planName = 'LIC Bima Lakshmi (Plan No. 857)';
                planDesc = 'Affordable savings and security shield with guaranteed additions. Ideal for stable, low-risk capital appreciation over a fixed duration.';
            } else {
                planName = 'LIC Jeevan Anand (Plan No. 815)';
                planDesc = 'Classic "double-cover" wealth protection. Pays the complete maturity sum and keeps a separate life insurance cover active for the rest of your life at zero cost.';
            }
        } else { // term
            if (selectedBudgetValue === 'high') {
                planName = 'LIC Bima Kavach (Plan No. 887)';
                planDesc = 'Premium term cover that refunds all premiums at maturity. Delivers high-limit pure family protection up to age 100.';
            } else if (selectedBudgetValue === 'low') {
                planName = 'LIC Saral Jeevan Bima (Plan No. 859)';
                planDesc = 'Standardized, easily accessible term insurance plan. Delivers straightforward, hassle-free life cover with no complex conditions.';
            } else {
                planName = 'LIC Yuva Term (Plan No. 875)';
                planDesc = 'Modern, high-cover pure term insurance designed for young professionals. Delivers massive family protection coverages at highly competitive rates.';
            }
        }
    } else { // dual cover
        if (selectedTargetValue === 'senior') {
            planName = 'Senior Care Combo: LIC Saral Pension + Star Senior Red Carpet';
            planDesc = 'A complete retirement package. Combines LIC\'s guaranteed immediate pension (100% refund of purchase price) with Star Health\'s dedicated senior hospitalization cover.';
        } else if (selectedObjectiveValue === 'retirement') {
            planName = 'Elite Retirement Combo: LIC Jeevan Utsav + Star Comprehensive';
            planDesc = 'Unparalleled financial freedom. Combines a guaranteed 10% annual lifetime payout from LIC with Star Health\'s zero-copay medical hospitalization shield.';
        } else if (selectedObjectiveValue === 'child') {
            planName = 'Family Growth Combo: LIC Amritbaal + Star Health Assure';
            planDesc = 'Comprehensive child and health shield. Links LIC\'s highest-yielding education fund (₹80/1000 SA additions) with a health floater covering up to 9 members.';
        } else if (selectedObjectiveValue === 'term') {
            planName = 'Shield Plus Combo: LIC Yuva Term + Star Super Star (Preferred)';
            planDesc = 'Maximum security, minimum cost. Pairs a massive-cover pure life term insurance with an age-locked premium health insurance plan.';
        } else {
            planName = 'Venkatesh\'s Signature Combo: LIC Jeevan Labh + Star Comprehensive';
            planDesc = 'Our most recommended combo. Integrates LIC\'s highest-returning limited-pay savings plan with Star Health\'s premium zero-copay family hospitalization plan.';
        }
    }

    rTitle.innerText = planName;
    rDesc.innerText = planDesc;

    document.getElementById('stepResult').classList.add('active');
}

window.restartFinder = function () {
    selectedCategoryValue = '';
    selectedTargetValue = '';
    selectedObjectiveValue = '';
    selectedBudgetValue = '';

    document.querySelectorAll('.finder-step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));

    document.getElementById('step1').classList.add('active');
}

window.injectRecommendationIntoContactForm = function () {
    const rTitle = document.getElementById('recommendedPlan').innerText;
    const messageArea = document.getElementById('formMessage');
    messageArea.value = `Hello Venkatesh! I just completed your Smart Policy Finder on the site and was recommended the plan: "${rTitle}". 

Here are my details:
- Coverage Type: ${selectedCategoryValue.toUpperCase()}
- Target Group: ${selectedTargetValue.toUpperCase()}
- Primary Objective: ${selectedObjectiveValue.toUpperCase()}
- Premium Budget: ${selectedBudgetValue.toUpperCase()}

Please contact me to share custom premium illustrations and details. Thank you!`;
    messageArea.dispatchEvent(new Event('change'));
}

// --- FORM SUBMISSION HANDLING ---
const captureForm = document.getElementById('leadCaptureForm');
if (captureForm) {
    captureForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Dispatched secure upload...`;

    const formData = new FormData();
    formData.append("access_key", "2694b7fd-3c89-4496-81fb-07063c70bc2b");
    formData.append("name", document.getElementById('formName').value);
    formData.append("email", document.getElementById('formEmail').value);
    formData.append("phone", document.getElementById('formPhone').value);
    formData.append("message", document.getElementById('formMessage').value);
    formData.append("subject", "New Financial Projection Request");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            document.getElementById('formSuccessModal').classList.add('active');
        } else {
            alert("Something went wrong. Please try again: " + result.message);
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("Unable to send message. Please check your internet connection and try again.");
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

window.resetContactForm = function () {
    document.getElementById('leadCaptureForm').reset();
    document.querySelectorAll('.form-input').forEach(input => {
        input.dispatchEvent(new Event('change'));
    });
    document.getElementById('formSuccessModal').classList.remove('active');
}