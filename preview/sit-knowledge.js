/**
 * SIT — Skin Intelligence Tool
 * Knowledge Base: Products, Ingredients, Q&A, Safety, Routines
 */

const SIT_KB = {

  /* ─────────────────────────────────────────────
     PRODUCT BRAIN
  ───────────────────────────────────────────── */
  products: {
    'serum-01': {
      handle: 'serum-01',
      name: 'Glow + Marks Serum',
      price: '£58',
      best_age: '18–35',
      primary_goal: 'brightening',
      secondary_goals: ['uneven_tone', 'glow', 'dullness', 'hydration'],
      suitable_skin_types: ['normal', 'combination', 'dry', 'oily'],
      avoid_if: ['very_sensitive', 'compromised_barrier'],
      sensitivity_level: 'medium',
      texture: 'lightweight fluid',
      am_pm: 'both',
      key_ingredients: ['3-O-Ethyl Ascorbic Acid (5–10%)', 'Niacinamide (4–5%)', 'Tranexamic Acid (2–3%)', 'Alpha Arbutin (1–2%)', 'Panthenol (1–2%)', 'Hyaluronic Acid (0.1–0.2%)', 'Licorice Extract (0.5–1%)'],
      routine_position: 1,
      compatible_products: ['serum-02', 'serum-04', 'serum-06', 'support-cream', 'support-spray'],
      not_recommended_with: [],
      short_reason: 'Glow + Marks hero: supports a brighter, more even-looking tone and softens the look of acne marks.',
      long_reason: 'Our Glow + Marks hero, ideal for the 18–35 range and anyone targeting dullness, uneven tone, pigmentation, and post-blemish marks. It pairs a stable, heat-friendly form of Vitamin C (3-O-Ethyl Ascorbic Acid) with Niacinamide, Tranexamic Acid, and Alpha Arbutin to support a brighter, more uniform-looking complexion, while Licorice Extract, Panthenol, and Hyaluronic Acid keep skin comfortable. The stable Vitamin C suits warm climates far better than pure L-ascorbic acid. Use SPF daily when using this serum in the morning. Results are gradual over 8–12 weeks.',
      how_to_use: 'Apply 3–4 drops to cleansed skin, AM and/or PM. Allow to absorb before next step. Always use SPF in the morning.',
      frequency: 'Morning preferred, or both AM and PM',
      introduction: 'Start every other day for 1–2 weeks if new to active ingredients.',
      image: null
    },
    'serum-02': {
      handle: 'serum-02',
      name: 'Peptide Repair Barrier Serum',
      price: '£64',
      best_age: '25–45',
      primary_goal: 'barrier_support',
      secondary_goals: ['hydration', 'dryness', 'sensitivity', 'calm', 'fine_lines'],
      suitable_skin_types: ['dry', 'sensitive', 'normal', 'combination'],
      avoid_if: [],
      sensitivity_level: 'very_low',
      texture: 'rich but non-greasy serum',
      am_pm: 'both',
      key_ingredients: ['Peptide Complex (2–5%)', 'Ceramide Complex (0.5–2%)', 'Squalane (2–5%)', 'Panthenol (1–2%)', 'Multi-weight Hyaluronic Acid (0.1–0.3%)', 'Niacinamide (2–4%)', 'Beta-Glucan (0.2–0.5%)'],
      routine_position: 1,
      compatible_products: ['serum-01', 'serum-03', 'serum-04', 'serum-05', 'serum-06', 'support-cream', 'support-spray'],
      not_recommended_with: [],
      short_reason: 'Peptide Repair hero: rebuilds the barrier and supports hydration, firmness, and a smoother look.',
      long_reason: 'Our Peptide Repair Barrier hero, ideal for the 25–45 range and any skin that feels dry, reactive, over-exfoliated, or compromised. A Peptide Complex supports firmness and a conditioned, resilient feel, while a Ceramide Complex, Squalane, and multi-weight Hyaluronic Acid replenish barrier lipids and layered hydration. Niacinamide, Beta-Glucan, and Panthenol soothe and support comfort. Gentle enough for daily use and a reassuring base under more targeted actives. It is the most layer-friendly serum in the range.',
      how_to_use: 'Apply 3–4 drops to cleansed skin, AM and/or PM. Can be used as the sole treatment step. Layer Support Cream over for deeper comfort.',
      frequency: 'Morning and evening',
      introduction: 'Gentle enough for immediate daily use.',
      image: null
    },
    'serum-03': {
      handle: 'serum-03',
      name: 'Caviar Lift Serum',
      price: '£88',
      best_age: '35+',
      primary_goal: 'age_support',
      secondary_goals: ['firmness', 'fine_lines', 'glow', 'texture'],
      suitable_skin_types: ['normal', 'dry', 'combination'],
      avoid_if: ['very_sensitive'],
      sensitivity_level: 'medium',
      texture: 'silky cushioning serum',
      am_pm: 'both',
      key_ingredients: ['Instant-Tightening Polymer / Pullulan (1–3%)', 'Peptide Blend (2–5%)', 'Caviar Extract (0.5–2%)', 'Marine DNA / Sodium DNA (0.1–0.5%)', 'Microalgae Extract (0.5–2%)', 'Niacinamide (2–4%)', 'Glycerin (3–5%)', 'Multi-weight Hyaluronic Acid (0.1–0.3%)', 'Ceramide Complex (0.2–1%)', 'Panthenol (1–2%)'],
      routine_position: 1,
      compatible_products: ['serum-02', 'serum-06', 'support-cream', 'support-spray'],
      not_recommended_with: [],
      short_reason: 'Caviar Lift flagship: an immediate 30-minute lifted look plus peptide and caviar support for firmness over time.',
      long_reason: 'Our premium Caviar Lift flagship, the luxury choice for skin 35+. Instant-tightening polymers such as Pullulan create a visible 30-minute smoothing, lifted, plumped finish, while a peptide blend, Caviar Extract, Marine DNA, and Microalgae Extract support firmer, well-conditioned-looking skin over time. Niacinamide, Glycerin, multi-weight Hyaluronic Acid, Ceramides, and Panthenol keep skin cushioned and comfortable. This formula is retinol-free, so it is gentle enough for daytime and special occasions as well as nightly use.',
      how_to_use: 'Apply 3–4 drops to cleansed skin. For an instant lift before an event, apply 30 minutes ahead and let it set. Follow with Support Cream.',
      frequency: 'Morning and/or evening',
      introduction: 'Suitable from day 1; patch test first if you have very sensitive skin.',
      image: null
    },
    'serum-04': {
      handle: 'serum-04',
      name: 'Exosome PDRN Repair Serum',
      price: '£78',
      best_age: '20–40',
      primary_goal: 'calm',
      secondary_goals: ['visible_redness', 'barrier_support', 'hydration', 'glow', 'sensitivity'],
      suitable_skin_types: ['sensitive', 'dry', 'normal', 'combination', 'oily'],
      avoid_if: [],
      sensitivity_level: 'very_low',
      texture: 'lightweight watery essence',
      am_pm: 'both',
      key_ingredients: ['Vegan Exosome-style Complex (0.5–3%)', 'PDRN / Marine DNA (0.1–0.5%)', 'Centella Asiatica (0.5–2%)', 'Madecassoside (0.05–0.2%)', 'Copper Tripeptide-1', 'Panthenol (1–2%)', 'Beta-Glucan (0.2–0.5%)', 'Multi-weight Hyaluronic Acid (0.1–0.3%)', 'Ceramide Complex (0.3–1%)', 'Allantoin (0.2–0.5%)'],
      routine_position: 1,
      compatible_products: ['serum-01', 'serum-02', 'serum-06', 'support-cream', 'support-spray'],
      not_recommended_with: [],
      short_reason: 'Korean clinic-style repair: supports post-blemish recovery, calmer-looking redness, and a glass-skin glow.',
      long_reason: 'Our rare-innovation repair serum, ideal for the 20–40 range and anyone chasing a "Korean clinic treatment" feel. A vegan exosome-style complex with PDRN/Marine DNA, Centella Asiatica, and Madecassoside supports a calmer, less red-looking complexion and the appearance of post-acne recovery, while Copper Tripeptide-1, Beta-Glucan, Ceramides, Allantoin, and multi-weight Hyaluronic Acid help skin look smooth, hydrated, and glass-like. Very well tolerated and a great daily base for reactive or recovering skin.',
      how_to_use: 'Apply 3–4 drops to cleansed skin, AM and/or PM, before heavier serums or cream.',
      frequency: 'Morning and evening',
      introduction: 'Gentle enough for immediate daily use.',
      image: null
    },
    'serum-05': {
      handle: 'serum-05',
      name: 'Retinal Bio-Lift Night Serum',
      price: '£72',
      best_age: '25–45',
      primary_goal: 'texture',
      secondary_goals: ['visible_pores', 'fine_lines', 'age_support', 'oil_balance', 'smoothness'],
      suitable_skin_types: ['normal', 'combination', 'oily', 'dry'],
      avoid_if: ['pregnant', 'very_sensitive', 'compromised_barrier'],
      sensitivity_level: 'medium_high',
      texture: 'silky night serum',
      am_pm: 'pm_only',
      key_ingredients: ['Encapsulated Retinaldehyde (0.03–0.1%)', 'Bakuchiol (0.5–1%)', 'Peptide Complex (2–5%)', 'Niacinamide (2–4%)', 'Ceramide Complex (0.5–1.5%)', 'Squalane (2–5%)', 'Bisabolol (0.1–0.3%)', 'CoQ10 (0.1–0.5%)', 'Panthenol (1–2%)', 'Hyaluronic Acid (0.1–0.2%)'],
      routine_position: 1,
      compatible_products: ['serum-02', 'support-cream'],
      not_recommended_with: ['serum-01', 'serum-03'],
      short_reason: 'Night renewal: encapsulated Retinaldehyde with Bakuchiol for texture, pores, and fine lines while you sleep.',
      long_reason: 'Our serious night treatment for the 25–45 range, targeting texture, visible pores, fine lines, skin renewal, and adult acne-prone skin. Encapsulated Retinaldehyde paired with Bakuchiol delivers gentle, gradual renewal, while a Peptide Complex, Ceramides, Squalane, CoQ10, Bisabolol, and Niacinamide keep the barrier supported and comfortable. Because it contains a retinoid, use it in the evening only, introduce it slowly, do not layer it with Vitamin C or other strong actives on the same night, avoid during pregnancy or breastfeeding, and always use SPF the following morning.',
      how_to_use: 'Apply 2–3 drops to cleansed, dry skin in the evening only. Follow with Support Cream. Always use SPF next morning.',
      frequency: 'Evening only, 2x per week to start',
      introduction: 'Start 2x per week for 4 weeks. Increase to every other night if no sensitivity. Full nightly use after 8–12 weeks.',
      image: null
    },
    'serum-06': {
      handle: 'serum-06',
      name: 'Neuro Peptide Eye & Smile Line Serum',
      price: '£54',
      best_age: '22–45',
      primary_goal: 'age_support',
      secondary_goals: ['fine_lines', 'dark_circles', 'puffiness', 'eye_area'],
      suitable_skin_types: ['dry', 'normal', 'combination', 'sensitive', 'oily'],
      avoid_if: [],
      sensitivity_level: 'low',
      texture: 'lightweight eye serum',
      am_pm: 'both',
      key_ingredients: ['Acetyl Hexapeptide-8 / Argireline (5–10%)', 'Dipeptide-2 (0.5–2%)', 'Palmitoyl Tetrapeptide-7 (1–3%)', 'Caffeine (0.5–1.5%)', 'Hesperidin Methyl Chalcone (0.1–0.5%)', 'Vitamin K Oxide (0.05–0.2%)', 'Niacinamide (2–3%)', 'Multi-weight Hyaluronic Acid (0.1–0.25%)', 'Pullulan (0.5–1.5%)', 'Panthenol (1%)'],
      routine_position: 1,
      compatible_products: ['serum-01', 'serum-02', 'serum-03', 'serum-04', 'serum-05', 'support-cream', 'support-spray'],
      not_recommended_with: [],
      short_reason: 'Eye & smile-line care: peptides, caffeine and Pullulan to soften the look of dark circles, puffiness and expression lines.',
      long_reason: 'Our targeted eye and expression-line serum for the 22–45 range, made for tired-looking eyes, puffiness, under-eye lines, and smile lines. Neuro-peptides such as Argireline, Dipeptide-2, and Palmitoyl Tetrapeptide-7 support a smoother look around expressive areas, while Caffeine and Hesperidin help refresh a puffy, tired appearance and Pullulan gives an instant smoothing finish. Vitamin K Oxide, Niacinamide, and Hyaluronic Acid support the look of dark circles and hydration. Gentle enough for the delicate eye area, morning and night.',
      how_to_use: 'Pat a small amount (rice-grain size) around the orbital bone and over smile lines, AM and/or PM. Avoid the lash line and inner eye.',
      frequency: 'Morning and evening',
      introduction: 'Suitable from day 1.',
      image: null
    },
    'support-cream': {
      handle: 'support-cream',
      name: 'Support Cream',
      price: '£48',
      primary_goal: 'moisturiser',
      secondary_goals: ['barrier_seal', 'hydration', 'comfort'],
      suitable_skin_types: ['dry', 'sensitive', 'normal', 'combination'],
      avoid_if: ['very_oily'],
      sensitivity_level: 'very_low',
      texture: 'medium-weight cream',
      am_pm: 'both',
      key_ingredients: ['Ceramide NP', 'Shea Butter', 'Squalane', 'Panthenol', 'Glycerin'],
      routine_position: 2,
      compatible_products: ['all'],
      not_recommended_with: [],
      short_reason: 'Seals in serum benefits and supports the skin barrier all day and night.',
      long_reason: 'A foundational moisturiser that works with every serum. Ceramides reinforce the barrier, Shea Butter provides lipid nourishment, and Squalane offers lightweight occlusion. Use after your serum to lock in active ingredients and maintain skin comfort. Suitable for morning and evening.',
      how_to_use: 'Apply over serum while skin is still slightly damp. Press gently into skin.',
      frequency: 'Morning and/or evening',
      introduction: 'Suitable from day 1.',
      image: null
    },
    'support-spray': {
      handle: 'support-spray',
      name: 'Facial Support Spray',
      price: '£32',
      primary_goal: 'hydration_refresh',
      secondary_goals: ['layering', 'calm', 'daytime_refresh'],
      suitable_skin_types: ['all'],
      avoid_if: [],
      sensitivity_level: 'very_low',
      texture: 'ultra-fine mist',
      am_pm: 'both',
      key_ingredients: ['Rose Water', 'Centella Asiatica', 'Glycerin', 'Aloe Vera', 'Hyaluronic Acid (low MW)'],
      routine_position: 0,
      compatible_products: ['all'],
      not_recommended_with: [],
      short_reason: 'Primes skin before serum and refreshes throughout the day.',
      long_reason: 'A multi-purpose hydrating mist that can be used before serum application to prepare and slightly dampen skin (improving serum absorption), mid-day as a comfort refresh, or as a final setting step. Suitable for all skin types.',
      how_to_use: 'Mist onto clean skin before serum, or over makeup for a refresh. Hold 20cm from face.',
      frequency: 'As needed, any time of day',
      introduction: 'Suitable from day 1.',
      image: null
    }
  },

  /* ─────────────────────────────────────────────
     QUICK MATCH QUESTIONS (5)
  ───────────────────────────────────────────── */
  quickQuestions: [
    {
      id: 'main_goal',
      text: 'What is your main skin goal?',
      hint: 'Choose the one that matters most right now.',
      type: 'single',
      options: [
        { value: 'hydration',      label: 'Hydration',         desc: 'Skin feels dry or tight' },
        { value: 'brightening',    label: 'Brightening',       desc: 'Dull or uneven-looking skin' },
        { value: 'barrier_support',label: 'Barrier Support',   desc: 'Sensitive or reactive skin' },
        { value: 'texture',        label: 'Smoother Texture',  desc: 'Rough or uneven surface feel' },
        { value: 'calm',           label: 'Calmer Skin',       desc: 'Visible redness or reactivity' },
        { value: 'oil_balance',    label: 'Oil Balance',       desc: 'Oily or congestion-prone skin' },
        { value: 'glow',           label: 'Glow',              desc: 'Tired or dull-looking skin' },
        { value: 'age_support',    label: 'Age Support',       desc: 'Fine lines or firmness support' }
      ]
    },
    {
      id: 'skin_type',
      text: 'What is your skin type?',
      hint: 'If you\'re unsure, think about how your skin behaves mid-afternoon.',
      type: 'single',
      options: [
        { value: 'dry',         label: 'Dry',         desc: 'Feels tight, looks dull' },
        { value: 'oily',        label: 'Oily',        desc: 'Shiny, especially T-zone' },
        { value: 'combination', label: 'Combination', desc: 'Oily T-zone, normal cheeks' },
        { value: 'sensitive',   label: 'Sensitive',   desc: 'Reacts easily, feels reactive' },
        { value: 'normal',      label: 'Normal',      desc: 'Generally balanced' },
        { value: 'unsure',      label: 'Not Sure',    desc: 'I\'ll let SIT decide' }
      ]
    },
    {
      id: 'post_cleanse',
      text: 'How does your skin feel right after cleansing?',
      hint: 'Before applying anything — just after washing.',
      type: 'single',
      options: [
        { value: 'tight',         label: 'Tight or Dry',        desc: 'Uncomfortable, feels taut' },
        { value: 'comfortable',   label: 'Comfortable',         desc: 'Balanced, no issue' },
        { value: 'oily_quickly',  label: 'Gets Oily Quickly',   desc: 'Shine within 30 minutes' },
        { value: 'dry_patches',   label: 'Dry in Some Areas',   desc: 'Patchy dryness, not uniform' },
        { value: 'reactive',      label: 'Warm or Reactive',    desc: 'Redness, stinging, or warmth' },
        { value: 'unsure',        label: 'Not Sure',            desc: 'Haven\'t paid attention' }
      ]
    },
    {
      id: 'experience',
      text: 'How experienced are you with active skincare ingredients?',
      hint: 'This helps us match the right formula strength.',
      type: 'single',
      options: [
        { value: 'beginner',      label: 'Beginner',      desc: 'New to serums and actives' },
        { value: 'intermediate',  label: 'Intermediate',  desc: 'Use a few products regularly' },
        { value: 'advanced',      label: 'Advanced',      desc: 'Familiar with AHAs, retinol etc.' }
      ]
    },
    {
      id: 'routine_pref',
      text: 'What kind of routine are you looking for?',
      hint: 'We\'ll keep it realistic for your lifestyle.',
      type: 'single',
      options: [
        { value: 'one_hero',  label: 'One Hero Product',     desc: 'Simple, minimal effort' },
        { value: 'two_step',  label: 'Simple 2-Step',        desc: 'Serum + moisturiser' },
        { value: 'full',      label: 'Full Routine',         desc: 'All the right steps' }
      ]
    }
  ],

  /* ─────────────────────────────────────────────
     FULL CONSULTATION QUESTIONS (20)
  ───────────────────────────────────────────── */
  fullQuestions: [
    {
      id: 'main_goal',
      text: 'What is your main skin goal?',
      hint: 'Your primary focus right now.',
      type: 'single',
      options: [
        { value: 'hydration',       label: 'Hydration',        desc: 'Skin feels dry or tight' },
        { value: 'brightening',     label: 'Brightening',      desc: 'Dull or uneven-looking skin' },
        { value: 'barrier_support', label: 'Barrier Support',  desc: 'Sensitive or reactive skin' },
        { value: 'texture',         label: 'Smoother Texture', desc: 'Rough or uneven surface feel' },
        { value: 'calm',            label: 'Calmer Skin',      desc: 'Visible redness or reactivity' },
        { value: 'oil_balance',     label: 'Oil Balance',      desc: 'Oily or congestion-prone' },
        { value: 'glow',            label: 'Glow',             desc: 'Tired or dull-looking skin' },
        { value: 'age_support',     label: 'Age Support',      desc: 'Fine lines or firmness' }
      ]
    },
    {
      id: 'secondary_goals',
      text: 'Any secondary goals? (Select all that apply)',
      hint: 'Optional but helps us refine your routine.',
      type: 'multi',
      options: [
        { value: 'hydration',       label: 'More hydration' },
        { value: 'brightening',     label: 'Brighter-looking skin' },
        { value: 'barrier_support', label: 'Barrier comfort' },
        { value: 'texture',         label: 'Texture refinement' },
        { value: 'calm',            label: 'Less visible redness' },
        { value: 'glow',            label: 'Radiance and glow' },
        { value: 'age_support',     label: 'Firmness and fine lines' },
        { value: 'oil_balance',     label: 'Oil control' }
      ]
    },
    {
      id: 'skin_type',
      text: 'What is your skin type?',
      hint: 'Think about mid-afternoon on an average day.',
      type: 'single',
      options: [
        { value: 'dry',         label: 'Dry',         desc: 'Tight, lacks moisture' },
        { value: 'oily',        label: 'Oily',        desc: 'Shiny throughout the day' },
        { value: 'combination', label: 'Combination', desc: 'Oily T-zone, drier elsewhere' },
        { value: 'sensitive',   label: 'Sensitive',   desc: 'Reacts easily to products' },
        { value: 'normal',      label: 'Normal',      desc: 'Balanced, few concerns' },
        { value: 'unsure',      label: 'Not Sure',    desc: 'Help me figure it out' }
      ]
    },
    {
      id: 'sensitivity',
      text: 'How sensitive does your skin feel?',
      hint: 'This affects which actives are right for you.',
      type: 'single',
      options: [
        { value: 'low',    label: 'Not Sensitive',    desc: 'Rarely reacts to products' },
        { value: 'medium', label: 'Mildly Sensitive', desc: 'Occasional reactions' },
        { value: 'high',   label: 'Very Sensitive',   desc: 'Frequently reacts, needs gentle care' }
      ]
    },
    {
      id: 'post_cleanse',
      text: 'How does your skin feel right after cleansing?',
      hint: 'Before applying any product.',
      type: 'single',
      options: [
        { value: 'tight',        label: 'Tight or Dry',      desc: 'Uncomfortable after washing' },
        { value: 'comfortable',  label: 'Comfortable',       desc: 'No notable sensation' },
        { value: 'oily_quickly', label: 'Gets Oily Quickly', desc: 'Shine returns within minutes' },
        { value: 'dry_patches',  label: 'Patchy Dryness',    desc: 'Some areas dry, others fine' },
        { value: 'reactive',     label: 'Warm or Reactive',  desc: 'Redness, stinging, or warmth' }
      ]
    },
    {
      id: 'mirror_concern',
      text: 'What do you notice most when you look in the mirror?',
      hint: 'Your main visible concern.',
      type: 'single',
      options: [
        { value: 'dullness',     label: 'Dullness',           desc: 'Skin looks flat or tired' },
        { value: 'redness',      label: 'Visible Redness',    desc: 'Uneven red patches or flush' },
        { value: 'texture',      label: 'Rough Texture',      desc: 'Bumpy or uneven surface' },
        { value: 'shine',        label: 'Excess Shine',       desc: 'Oily appearance' },
        { value: 'dryness',      label: 'Dry Patches',        desc: 'Flaky or tight-looking areas' },
        { value: 'uneven_tone',  label: 'Uneven Tone',        desc: 'Dark marks or discolouration' },
        { value: 'fine_lines',   label: 'Fine Lines',         desc: 'Around eyes or forehead' },
        { value: 'congestion',   label: 'Congestion',         desc: 'Clogged pores or congestion' }
      ]
    },
    {
      id: 'visible_redness',
      text: 'Do you experience visible redness or flushing?',
      hint: 'This helps identify if calming ingredients are needed.',
      type: 'single',
      options: [
        { value: 'often',     label: 'Often',     desc: 'Most days' },
        { value: 'sometimes', label: 'Sometimes', desc: 'Triggered by heat, stress, or products' },
        { value: 'rarely',    label: 'Rarely',    desc: 'Hardly ever' },
        { value: 'never',     label: 'Never',     desc: 'Not a concern' }
      ]
    },
    {
      id: 'oiliness',
      text: 'Does your skin feel oily during the day?',
      hint: 'Even if your skin type is combination.',
      type: 'single',
      options: [
        { value: 'yes_all',  label: 'Yes, all over',  desc: 'Shine across the whole face' },
        { value: 't_zone',   label: 'T-zone only',    desc: 'Forehead, nose, chin' },
        { value: 'rarely',   label: 'Rarely',         desc: 'Only in warm weather or stress' },
        { value: 'no',       label: 'No',             desc: 'More dry than oily' }
      ]
    },
    {
      id: 'dryness',
      text: 'Does your skin feel dry or tight during the day?',
      hint: 'Even after applying moisturiser.',
      type: 'single',
      options: [
        { value: 'often',     label: 'Yes, often',         desc: 'Tight feeling persists all day' },
        { value: 'by_end',    label: 'By end of day',      desc: 'Gets tighter as the day goes on' },
        { value: 'sometimes', label: 'Sometimes',          desc: 'On and off' },
        { value: 'rarely',    label: 'Rarely',             desc: 'Skin stays comfortable' }
      ]
    },
    {
      id: 'active_usage',
      text: 'Are you currently using active skincare ingredients?',
      hint: 'Actives include: AHAs, BHAs, retinol, vitamin C, niacinamide, etc.',
      type: 'single',
      options: [
        { value: 'none',           label: 'None',              desc: 'Not currently using any' },
        { value: 'some_niacinamide', label: 'Niacinamide only', desc: 'Gentle actives only' },
        { value: 'aha_bha',        label: 'AHAs/BHAs',        desc: 'Exfoliating acids' },
        { value: 'retinol',        label: 'Retinol',          desc: 'Vitamin A derivatives' },
        { value: 'mixed',          label: 'Several',          desc: 'Mixing multiple actives' }
      ]
    },
    {
      id: 'prescription',
      text: 'Are you using any prescription skincare or under medical treatment for your skin?',
      hint: 'For example: Tretinoin, Clindamycin, Benzoyl Peroxide by prescription, or medical treatment.',
      type: 'single',
      options: [
        { value: 'no',            label: 'No',               desc: 'No prescription products' },
        { value: 'yes_topical',   label: 'Yes, topical',     desc: 'Prescription cream or gel' },
        { value: 'yes_oral',      label: 'Yes, oral/other',  desc: 'Medication for skin health' },
        { value: 'prefer_not',    label: 'Prefer not to say', desc: 'I\'d rather skip this' }
      ]
    },
    {
      id: 'pregnancy',
      text: 'Are you pregnant, breastfeeding, or avoiding any specific ingredients?',
      hint: 'This helps us avoid retinol and other cautioned ingredients.',
      type: 'single',
      options: [
        { value: 'pregnant',       label: 'Pregnant',            desc: 'Currently pregnant' },
        { value: 'breastfeeding',  label: 'Breastfeeding',       desc: 'Currently breastfeeding' },
        { value: 'avoiding',       label: 'Avoiding some ingredients', desc: 'E.g. fragrance, retinol' },
        { value: 'no',             label: 'None apply',          desc: 'No restrictions' }
      ]
    },
    {
      id: 'safety_concern',
      text: 'Do you have any skin that is painful, bleeding, infected, or rapidly changing?',
      hint: 'This is important. SIT is a cosmetic tool and cannot help with medical skin concerns.',
      type: 'single',
      options: [
        { value: 'yes',        label: 'Yes',            desc: 'I have a concerning skin issue' },
        { value: 'no',         label: 'No',             desc: 'No medical concerns' },
        { value: 'not_sure',   label: 'Not Sure',       desc: 'I\'m uncertain' }
      ]
    },
    {
      id: 'am_routine',
      text: 'What is your current morning routine?',
      hint: 'Don\'t worry if it\'s basic — we can build from here.',
      type: 'multi',
      options: [
        { value: 'cleanser',     label: 'Cleanser' },
        { value: 'toner',        label: 'Toner/Mist' },
        { value: 'serum',        label: 'Serum' },
        { value: 'moisturiser',  label: 'Moisturiser' },
        { value: 'spf',          label: 'SPF' },
        { value: 'nothing',      label: 'Nothing yet' }
      ]
    },
    {
      id: 'pm_routine',
      text: 'What is your current evening routine?',
      hint: 'Evening routines are where active products work best.',
      type: 'multi',
      options: [
        { value: 'double_cleanse', label: 'Double Cleanse' },
        { value: 'cleanser',       label: 'Single Cleanse' },
        { value: 'toner',          label: 'Toner/Mist' },
        { value: 'serum',          label: 'Serum' },
        { value: 'moisturiser',    label: 'Moisturiser/Cream' },
        { value: 'nothing',        label: 'Nothing yet' }
      ]
    },
    {
      id: 'spf',
      text: 'Do you use SPF daily?',
      hint: 'SPF is essential when using many active ingredients.',
      type: 'single',
      options: [
        { value: 'daily',     label: 'Every morning',  desc: 'Consistent daily habit' },
        { value: 'sometimes', label: 'Sometimes',      desc: 'On sunny days or occasionally' },
        { value: 'rarely',    label: 'Rarely',         desc: 'Not a current habit' },
        { value: 'no',        label: 'No',             desc: 'Don\'t currently use SPF' }
      ]
    },
    {
      id: 'texture_pref',
      text: 'What texture do you prefer for a serum?',
      hint: 'This helps with comfort and wearability.',
      type: 'single',
      options: [
        { value: 'watery',    label: 'Very Light',      desc: 'Almost water-like' },
        { value: 'fluid',     label: 'Fluid/Gel',       desc: 'Light but with some body' },
        { value: 'serum',     label: 'Classic Serum',   desc: 'Medium consistency' },
        { value: 'richer',    label: 'Richer',          desc: 'Nourishing and cushioning' },
        { value: 'no_pref',   label: 'No Preference',   desc: 'Whatever works best' }
      ]
    },
    {
      id: 'routine_pref',
      text: 'What kind of routine are you looking to build?',
      hint: 'Be honest — the best routine is one you\'ll actually follow.',
      type: 'single',
      options: [
        { value: 'one_hero', label: 'One Hero Product',      desc: 'Keep it simple' },
        { value: 'two_step', label: 'Two Steps',             desc: 'Serum + moisturiser' },
        { value: 'full',     label: 'Complete Routine',      desc: 'All the right steps' }
      ]
    },
    {
      id: 'photo_upload',
      text: 'Would you like to upload a skin photo for additional analysis?',
      hint: 'Optional. Natural light, minimal makeup, front-facing image works best.',
      type: 'single',
      options: [
        { value: 'yes',    label: 'Yes, upload a photo',  desc: 'For more personalised analysis' },
        { value: 'no',     label: 'No thanks',            desc: 'Continue without photo' },
        { value: 'later',  label: 'Maybe later',          desc: 'I\'ll decide after my results' }
      ]
    },
    {
      id: 'extra_notes',
      text: 'Anything else SIT should know about your skin?',
      hint: 'Optional free text — allergies, concerns, previous reactions, anything.',
      type: 'text',
      placeholder: 'e.g. I\'m allergic to fragrance, or I had a bad reaction to retinol last year...'
    }
  ],

  /* ─────────────────────────────────────────────
     SCORING MATRIX
     Each answer key maps to per-product scores
  ───────────────────────────────────────────── */
  scoring: {
    main_goal: {
      hydration:       { 's02': 12, 's04': 6, 's01': 3 },
      brightening:     { 's01': 12, 's04': 4, 's03': 3 },
      barrier_support: { 's02': 12, 's04': 8 },
      texture:         { 's05': 12, 's03': 5, 's01': 2 },
      calm:            { 's04': 12, 's02': 8 },
      oil_balance:     { 's05': 10, 's04': 4 },
      glow:            { 's01': 12, 's04': 6, 's03': 4 },
      age_support:     { 's03': 12, 's05': 8, 's06': 6 }
    },
    skin_type: {
      dry:         { 's02': 4, 's04': 2, 's03': 1 },
      oily:        { 's05': 3, 's04': 2, 's01': 1 },
      combination: { 's01': 2, 's04': 2, 's05': 1 },
      sensitive:   { 's04': 5, 's02': 4 },
      normal:      { 's01': 2, 's03': 2 },
      unsure:      {}
    },
    post_cleanse: {
      tight:        { 's02': 5, 's04': 3 },
      oily_quickly: { 's05': 4, 's01': 2 },
      reactive:     { 's04': 6, 's02': 4 },
      dry_patches:  { 's02': 3, 's04': 2 },
      comfortable:  {},
      unsure:       {}
    },
    sensitivity: {
      high:   { 's04': 5, 's02': 4 },
      medium: { 's04': 2, 's02': 1 },
      low:    {}
    },
    visible_redness: {
      often:     { 's04': 6, 's02': 3 },
      sometimes: { 's04': 3, 's02': 1 },
      rarely:    {},
      never:     {}
    },
    oiliness: {
      yes_all: { 's05': 4, 's01': 1 },
      t_zone:  { 's05': 2, 's01': 1 },
      rarely:  {},
      no:      {}
    },
    mirror_concern: {
      dullness:    { 's01': 5, 's04': 3 },
      redness:     { 's04': 5, 's02': 3 },
      texture:     { 's05': 5, 's03': 2 },
      shine:       { 's05': 4, 's01': 1 },
      dryness:     { 's02': 5, 's04': 3 },
      uneven_tone: { 's01': 5, 's04': 2 },
      fine_lines:  { 's03': 5, 's05': 4, 's06': 4 },
      congestion:  { 's05': 5, 's04': 2 }
    },
    experience: {
      beginner:     { 's05': -4, 's03': -1 },
      intermediate: {},
      advanced:     { 's05': 2, 's03': 1 }
    }
  },

  /* ─────────────────────────────────────────────
     SAFETY RULES
  ───────────────────────────────────────────── */
  safetyRules: {
    hard_stop: {
      triggers: ['painful', 'bleeding', 'infected', 'swollen', 'rapidly_changing', 'burns', 'open_wound'],
      message: 'The symptoms you\'ve described may need professional attention. SIT is a cosmetic skincare tool and cannot assess, diagnose, or treat medical skin concerns. Please consult a dermatologist or qualified medical professional. If symptoms are severe, seek urgent medical care.',
      allow_basic_only: true
    },
    pregnancy: {
      triggers: ['pregnant', 'breastfeeding'],
      avoid_products: ['serum-05'],
      avoid_ingredients: ['retinol', 'retinaldehyde'],
      message: 'During pregnancy or breastfeeding, we recommend avoiding retinoids such as the Retinaldehyde in our Retinal Bio-Lift Night Serum. SIT has adjusted your recommendations accordingly. Please consult your healthcare provider or dermatologist for personalised advice during this period.',
      flag_level: 'caution'
    },
    prescription: {
      triggers: ['yes_topical', 'yes_oral'],
      message: 'You\'ve mentioned you\'re using prescription skincare or medical treatment. SIT will provide general cosmetic guidance, but we recommend checking with your prescribing professional before adding new active ingredients to your routine.',
      flag_level: 'caution'
    },
    not_sure_safety: {
      triggers: ['not_sure'],
      message: 'If you\'re uncertain about a skin concern, it\'s always best to speak with a dermatologist before starting new active skincare. SIT will suggest gentle options only.',
      flag_level: 'gentle'
    }
  },

  /* ─────────────────────────────────────────────
     ROUTINE BRAIN — Morning & Evening Templates
  ───────────────────────────────────────────── */
  routineTemplates: {
    morning: {
      minimal: ['Cleanse', 'Serum', 'SPF'],
      standard: ['Cleanse', 'Mist (optional)', 'Serum', 'Moisturiser', 'SPF'],
      full: ['Double Cleanse', 'Mist', 'Serum 1', 'Serum 2 (if layering)', 'Moisturiser', 'SPF']
    },
    evening: {
      minimal: ['Cleanse', 'Serum'],
      standard: ['Cleanse', 'Serum', 'Support Cream'],
      full: ['Double Cleanse', 'Mist', 'Serum 1', 'Serum 2 (if layering)', 'Support Cream']
    }
  },

  /* ─────────────────────────────────────────────
     Q&A BANK — 100 Brand-Approved Entries
  ───────────────────────────────────────────── */
  qa: [
    {
      id: 'qa_001',
      category: 'hydration',
      question: 'Which serum should I use if my skin feels tight after cleansing?',
      answer: 'Tight skin after cleansing is often a sign of dehydration or a weakened barrier. The Peptide Repair Barrier Serum is a good first step — it provides multi-depth moisture without any irritation risk. Follow with the Support Cream to seal in comfort.',
      products: ['serum-02', 'support-cream'],
      tags: ['tight', 'hydration', 'post-cleanse', 'barrier'],
      safety_level: 'low'
    },
    {
      id: 'qa_002',
      category: 'sensitivity',
      question: 'I have sensitive skin. Where should I start?',
      answer: 'For sensitive skin, we always recommend starting with barrier-first or calming products. The Exosome PDRN Repair Serum and Peptide Repair Barrier Serum are both designed with sensitivity in mind. Start one at a time, patch test first, and introduce slowly over 2–4 weeks before adding anything else.',
      products: ['serum-04', 'serum-02', 'support-cream'],
      tags: ['sensitive', 'beginner', 'barrier', 'calm'],
      safety_level: 'low'
    },
    {
      id: 'qa_003',
      category: 'layering',
      question: 'Can I use more than one serum?',
      answer: 'Yes — but we recommend introducing them one at a time and allowing your skin to adjust. Once comfortable, you can layer: apply the lightest texture first, then the next. Use the Support Spray before your first serum to improve absorption. Avoid layering two exfoliating actives (e.g. AHA and BHA) on the same evening.',
      products: ['support-spray'],
      tags: ['layering', 'multiple-serums', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_004',
      category: 'spf',
      question: 'Do I need to use SPF with these serums?',
      answer: 'SPF is important whenever you use active ingredients such as Vitamin C, AHAs, or Retinol in the morning. We recommend daily SPF 30 or higher regardless, as UV exposure is one of the most significant factors affecting skin appearance over time.',
      products: [],
      tags: ['spf', 'sunscreen', 'actives', 'morning'],
      safety_level: 'low'
    },
    {
      id: 'qa_005',
      category: 'brightening',
      question: 'My skin looks dull. Which serum is best for a glow?',
      answer: 'Dull skin can be caused by dehydration, slow cell turnover, or lack of radiance-supporting ingredients. The Glow + Marks Serum is formulated specifically for luminosity. If your dullness also involves uneven tone or discolouration appearance, the Glow + Marks Serum may be more targeted. Both can be used together by alternating in the evening.',
      products: ['serum-01'],
      tags: ['dull', 'glow', 'radiance', 'brightening'],
      safety_level: 'low'
    },
    {
      id: 'qa_006',
      category: 'retinol',
      question: 'Can I use retinol every night?',
      answer: 'It\'s best to introduce a retinoid slowly. The Retinal Bio-Lift Night Serum uses encapsulated Retinaldehyde (paired with gentle Bakuchiol) — start using it 2 times per week in the evening only. After 4 weeks with no sensitivity, increase to every other night. Full nightly use should only be reached after 8–12 weeks of comfortable use. Always follow with the Support Cream, and use SPF the following morning.',
      products: ['serum-03', 'support-cream'],
      tags: ['retinol', 'age-support', 'introduction', 'frequency'],
      safety_level: 'medium'
    },
    {
      id: 'qa_007',
      category: 'oily',
      question: 'My skin is oily and I get congestion. What do I use?',
      answer: 'For oily, congestion-prone skin, the Retinal Bio-Lift Night Serum is a good choice — its encapsulated Retinaldehyde supports a clearer-looking surface, refined pores, and adult acne-prone skin over time. Start every other evening and build up. Keep your moisturiser lightweight — the Facial Support Spray can be a refreshing, light option if your skin is very oily. If you mainly want calming and post-blemish recovery, pair with the Exosome PDRN Repair Serum.',
      products: ['serum-05', 'support-spray'],
      tags: ['oily', 'congestion', 'bha', 'salicylic'],
      safety_level: 'low'
    },
    {
      id: 'qa_008',
      category: 'patch-test',
      question: 'Should I patch test before using a new serum?',
      answer: 'Yes, we always recommend patch testing. Apply a small amount behind your ear or on your inner arm. Leave for 24 hours. If no reaction occurs, apply to a small area on your face for a further 24 hours. Only proceed with full use if comfortable. This is especially important for sensitive skin.',
      products: [],
      tags: ['patch-test', 'safety', 'introduction'],
      safety_level: 'low'
    },
    {
      id: 'qa_009',
      category: 'barrier',
      question: 'My skin feels raw and over-exfoliated. What should I use?',
      answer: 'If your skin feels raw or over-exfoliated, stop all exfoliating actives immediately. Focus on barrier repair: the Peptide Repair Barrier Serum and Support Cream together can help restore comfort. Avoid all AHAs, BHAs, retinol, and Vitamin C until your skin feels settled — usually 1–2 weeks. Reintroduce slowly afterwards.',
      products: ['serum-02', 'support-cream'],
      tags: ['over-exfoliated', 'barrier', 'recovery', 'raw-skin'],
      safety_level: 'medium'
    },
    {
      id: 'qa_010',
      category: 'pregnancy',
      question: 'I\'m pregnant. Which products are safe to use?',
      answer: 'During pregnancy or breastfeeding, the main product we recommend pausing is the Retinal Bio-Lift Night Serum, because retinoids such as Retinaldehyde are generally avoided. Our Peptide Repair Barrier Serum, Exosome PDRN Repair Serum, Caviar Lift Serum (which is retinol-free), Neuro Peptide Eye & Smile Line Serum, and Support Cream are gentler options many people choose. Always check the full ingredient list and consult your midwife or healthcare provider for personalised guidance.',
      products: ['serum-02', 'serum-04', 'serum-03', 'support-cream'],
      tags: ['pregnancy', 'retinol-free', 'safety', 'safe-ingredients'],
      safety_level: 'caution'
    },
    {
      id: 'qa_011',
      category: 'texture',
      question: 'How do I improve the texture of my skin?',
      answer: 'Rough or uneven skin texture often responds well to gentle renewal over time. The Retinal Bio-Lift Night Serum uses encapsulated Retinaldehyde with Bakuchiol to support a smoother-looking surface, refined pores, and fewer visible fine lines — without harsh scrubbing. Use 2–3 times per week in the evening to start, always follow with the Support Cream, and use SPF the next morning.',
      products: ['serum-05'],
      tags: ['texture', 'lactic-acid', 'exfoliant', 'smoothness'],
      safety_level: 'low'
    },
    {
      id: 'qa_012',
      category: 'redness',
      question: 'I have visible redness. Which serum helps?',
      answer: 'Visible redness can have different causes — environmental, reactive skin, or broken capillaries. The Exosome PDRN Repair Serum is formulated to support a calmer, less red-looking complexion with Centella Asiatica, Madecassoside, Beta-Glucan, and a vegan exosome-style complex. If your redness is severe, painful, or medically concerning, we recommend consulting a dermatologist.',
      products: ['serum-04'],
      tags: ['redness', 'reactive', 'calm', 'azelaic-acid'],
      safety_level: 'low'
    },
    {
      id: 'qa_013',
      category: 'comparison',
      question: 'What is the difference between the Glow Serum and the Brightening Serum?',
      answer: 'The Glow + Marks Serum focuses on overall radiance and vitality — it\'s ideal for tired or dull-looking skin wanting a healthy luminosity. The Glow + Marks Serum targets uneven-looking tone and discolouration appearance more directly using Niacinamide, Vitamin C, and Alpha Arbutin. If your concern is general glow, start with the Glow Serum. If uneven tone is the issue, start with Brightening.',
      products: ['serum-01'],
      tags: ['comparison', 'glow', 'brightening', 'difference'],
      safety_level: 'low'
    },
    {
      id: 'qa_014',
      category: 'routine',
      question: 'What is the correct order to apply my skincare?',
      answer: 'As a general rule: apply from thinnest to thickest. Morning: Cleanse → Mist (optional) → Serum → Moisturiser → SPF. Evening: Cleanse → Serum → Cream. If layering two serums, apply the lighter one first, wait 30–60 seconds, then apply the second. The Support Spray can be used before serum to prepare skin.',
      products: ['support-spray', 'support-cream'],
      tags: ['routine-order', 'layering', 'application', 'steps'],
      safety_level: 'low'
    },
    {
      id: 'qa_015',
      category: 'age-support',
      question: 'I want to target fine lines. What is the best approach?',
      answer: 'For fine line appearance and firmness, the Caviar Lift Serum is our flagship choice — peptides, Caviar Extract, and instant-tightening Pullulan support a firmer, lifted look. For deeper night-time renewal, the Retinal Bio-Lift Night Serum adds encapsulated Retinaldehyde, Bakuchiol, Peptides, and CoQ10; introduce it slowly, 2 nights per week for 4 weeks first. The Neuro Peptide Eye & Smile Line Serum targets expression lines around the eyes and mouth.',
      products: ['serum-03', 'serum-05', 'serum-06'],
      tags: ['fine-lines', 'retinol', 'age-support', 'firmness'],
      safety_level: 'medium'
    },

    /* ── Ingredient education ── */
    {
      id: 'qa_016',
      category: 'ingredients',
      question: 'What does Niacinamide do for the skin?',
      answer: 'Niacinamide (Vitamin B3) is one of the most versatile skincare ingredients. It can support a more even-looking tone, help reduce the look of enlarged pores, support the skin barrier, and help balance the appearance of oil. It is gentle and well tolerated by most skin types, and appears across our range — including the Glow + Marks, Peptide Repair Barrier, Caviar Lift, Exosome PDRN Repair, and Retinal Bio-Lift Night serums. It layers comfortably with almost everything.',
      products: ['serum-01', 'serum-02'],
      tags: ['niacinamide', 'vitamin-b3', 'pores', 'oil-balance', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_017',
      category: 'ingredients',
      question: 'What is 3-O-Ethyl Ascorbic Acid and how is it different from regular Vitamin C?',
      answer: '3-O-Ethyl Ascorbic Acid is a stable, water-soluble form of Vitamin C. Compared with pure L-ascorbic acid, it is far less prone to oxidising or turning yellow, which makes it a better choice in warm climates. It supports a brighter, more even-looking complexion and helps with the appearance of marks and dullness. You will find it in our Glow + Marks Serum, where it works alongside Niacinamide and Tranexamic Acid.',
      products: ['serum-01'],
      tags: ['vitamin-c', 'ethyl-ascorbic-acid', 'brightening', 'stable', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_018',
      category: 'ingredients',
      question: 'What does Tranexamic Acid do?',
      answer: 'Tranexamic Acid is valued for supporting a more even-looking tone and helping reduce the appearance of stubborn discolouration and post-blemish marks. It is gentle, pairs well with Niacinamide and Vitamin C, and is suitable for most skin types. It features in our Glow + Marks Serum. As always, this is cosmetic support for the look of the skin, not a treatment for any medical pigmentation condition.',
      products: ['serum-01'],
      tags: ['tranexamic-acid', 'pigmentation', 'marks', 'even-tone', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_019',
      category: 'ingredients',
      question: 'What is Alpha Arbutin used for?',
      answer: 'Alpha Arbutin is a gentle, well-tolerated ingredient that helps support a brighter, more even-looking complexion and can soften the appearance of dark marks over time. It works slowly and steadily and suits sensitive skin better than harsher brightening actives. It is part of our Glow + Marks Serum alongside Tranexamic Acid and Alpha Arbutin-friendly Niacinamide.',
      products: ['serum-01'],
      tags: ['alpha-arbutin', 'brightening', 'dark-marks', 'gentle', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_020',
      category: 'ingredients',
      question: 'What are peptides and what do they do?',
      answer: 'Peptides are small chains of amino acids that act as supportive signals in skincare. Cosmetically, they help skin look firmer, smoother, and more resilient, and support a comfortable, well-conditioned feel. Our Barrier and Age serums use peptide complexes, and our flagship firming serum pairs peptides with film-forming polymers for an immediate smoothing finish.',
      products: ['serum-02', 'serum-03'],
      tags: ['peptides', 'firmness', 'anti-ageing', 'smoothing', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_021',
      category: 'ingredients',
      question: 'What are ceramides and why are they important?',
      answer: 'Ceramides are lipids that naturally exist between skin cells, helping hold the barrier together and keep moisture in. When skin feels tight, flaky, or reactive, replenishing ceramides can restore comfort. Our Peptide Repair Barrier Serum and Support Cream are both rich in ceramides, making them ideal for a stressed or sensitised barrier.',
      products: ['serum-02', 'support-cream'],
      tags: ['ceramides', 'barrier', 'lipids', 'moisture', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_022',
      category: 'ingredients',
      question: 'What is Squalane and is it good for oily skin?',
      answer: 'Squalane is a lightweight, non-greasy emollient that mimics oils naturally found in skin. It cushions and softens without feeling heavy, and because it is non-comedogenic it generally suits oily and combination skin as well as dry skin. It appears in our Barrier and Age serums and the Support Cream.',
      products: ['serum-02', 'support-cream'],
      tags: ['squalane', 'lightweight', 'oily-skin', 'emollient', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_023',
      category: 'ingredients',
      question: 'What does Beta-Glucan do for the skin?',
      answer: 'Beta-Glucan is a soothing, hydrating ingredient that helps calm the look of stressed or reactive skin while supporting a plump, comfortable feel. It is exceptionally gentle and pairs well with barrier and calming routines. You will find it in our Barrier and Calm serums.',
      products: ['serum-02', 'serum-04'],
      tags: ['beta-glucan', 'soothing', 'hydration', 'calm', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_024',
      category: 'ingredients',
      question: 'What is Panthenol?',
      answer: 'Panthenol (Pro-Vitamin B5) is a humectant and soothing agent that helps skin feel soft, calm, and comfortable. It supports the barrier and is excellent after exfoliation or for reactive skin. It appears across several of our formulas including the Hydration Serum and Support Cream.',
      products: ['serum-02', 'support-cream'],
      tags: ['panthenol', 'vitamin-b5', 'soothing', 'barrier', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_025',
      category: 'ingredients',
      question: 'What is the difference between Hyaluronic Acid and Glycerin?',
      answer: 'Both are humectants that draw water into the skin. Glycerin is small and works at the surface for immediate softness, while Hyaluronic Acid — especially in multiple molecular weights — hydrates at different depths for a plumper look. Our Peptide Repair Barrier Serum combines both for layered, comfortable moisture.',
      products: ['serum-02'],
      tags: ['hyaluronic-acid', 'glycerin', 'humectant', 'hydration', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_026',
      category: 'ingredients',
      question: 'What is Bakuchiol and is it a natural retinol?',
      answer: 'Bakuchiol is a plant-derived ingredient often described as a gentle alternative to retinol. It can support a smoother, more radiant look and is generally far better tolerated, with no associated sun sensitivity, so it can be used in the daytime. It features in our Glow + Marks Serum. It is a good option if retinol feels too strong for your skin.',
      products: ['serum-01'],
      tags: ['bakuchiol', 'retinol-alternative', 'gentle', 'glow', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_027',
      category: 'ingredients',
      question: 'What does Azelaic Acid do?',
      answer: 'Azelaic Acid is a gentle active that can support a clearer, more even-looking and less red-looking complexion, and it suits sensitive, reactive skin. It is not currently used in our range, but for similar even-tone and calming benefits the Glow + Marks Serum (Tranexamic Acid, Alpha Arbutin, Niacinamide) and the Exosome PDRN Repair Serum (Centella, Madecassoside) are good options. Higher prescription strengths exist for medical concerns — those should be discussed with a dermatologist.',
      products: ['serum-04'],
      tags: ['azelaic-acid', 'redness', 'even-tone', 'calm', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_028',
      category: 'ingredients',
      question: 'What is Salicylic Acid and how does it work?',
      answer: 'Salicylic Acid is a BHA (beta-hydroxy acid) that is oil-soluble, so it can work inside the pore to help reduce the look of congestion and support oil balance. It is not currently in our range, but for congestion-prone and oily skin the Retinal Bio-Lift Night Serum (encapsulated Retinaldehyde) supports clearer-looking pores and a refined surface over time. Start every other evening, follow with the Support Cream, and use SPF the next day.',
      products: ['serum-05'],
      tags: ['salicylic-acid', 'bha', 'congestion', 'oily', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_029',
      category: 'ingredients',
      question: 'What does Zinc PCA do?',
      answer: 'Zinc PCA helps support oil balance and a fresher-looking, less shiny complexion, which makes it useful for oily and combination skin. While it is not a hero ingredient in our current range, Niacinamide — which features across our serums, including the Glow + Marks and Retinal Bio-Lift Night Serums — offers similar oil-balancing and complexion-comforting support.',
      products: ['serum-05'],
      tags: ['zinc-pca', 'oil-balance', 'oily', 'shine', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_030',
      category: 'ingredients',
      question: 'What is Centella Asiatica (Cica)?',
      answer: 'Centella Asiatica, often called Cica, is a botanical prized for soothing the look of stressed, red, or reactive skin and supporting a calm, comfortable feel. It is a hero ingredient in our Exosome PDRN Repair Serum and also appears in the Support Spray and Barrier Serum.',
      products: ['serum-04', 'support-spray'],
      tags: ['centella', 'cica', 'soothing', 'calm', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_031',
      category: 'ingredients',
      question: 'What is Licorice Root extract used for in skincare?',
      answer: 'Licorice Root extract is a gentle botanical that helps support a brighter, more even-looking tone and can soothe the look of redness. It complements brightening actives nicely and appears in our Brightening and Glow serums.',
      products: ['serum-01'],
      tags: ['licorice', 'brightening', 'even-tone', 'soothing', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_032',
      category: 'ingredients',
      question: 'What is PDRN or caviar-derived DNA in luxury serums?',
      answer: 'Ingredients such as Sodium DNA, marine or caviar-derived polynucleotides (often labelled PDRN) are premium conditioning agents valued in luxury skincare for supporting a hydrated, plump, well-rested look and a smooth, resilient feel. They feature in our flagship firming serum alongside peptides and caviar extract. These are cosmetic skin-conditioning ingredients, not medical treatments.',
      products: ['serum-03'],
      tags: ['pdrn', 'caviar', 'sodium-dna', 'luxury', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_033',
      category: 'ingredients',
      question: 'What does Caviar extract do in a serum?',
      answer: 'Caviar extract is a luxury ingredient rich in conditioning lipids, amino acids, and minerals. Cosmetically it supports a nourished, supple, radiant look and a smooth feel. In our flagship firming serum it is paired with peptides and instant-tightening polymers for both an immediate and a conditioned-over-time finish. Vegan caviar alternatives offer a similar sensorial, nourishing effect.',
      products: ['serum-03'],
      tags: ['caviar', 'luxury', 'nourishing', 'firming', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_034',
      category: 'ingredients',
      question: 'What is Pullulan and how does a serum tighten skin instantly?',
      answer: 'Pullulan and similar polysaccharide film-formers create a fine, breathable film on the skin that gives an immediate smoothing, tightening sensation and a more lifted look. The effect is cosmetic and temporary — it sits on the surface rather than changing the skin structurally — which is exactly why it feels so striking right after application. Our flagship firming serum uses this alongside longer-term peptide support.',
      products: ['serum-03'],
      tags: ['pullulan', 'instant-tightening', 'film-former', 'lift', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_035',
      category: 'ingredients',
      question: 'What is Microalgae extract good for?',
      answer: 'Microalgae and marine extracts are rich in minerals and conditioning compounds that support a hydrated, replenished, comfortable look. They are often found in premium firming and barrier formulas — including our flagship firming serum — for their nourishing, antioxidant-supporting feel.',
      products: ['serum-03'],
      tags: ['microalgae', 'marine', 'antioxidant', 'luxury', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_036',
      category: 'ingredients',
      question: 'What are antioxidants like Vitamin E and Ferulic Acid for?',
      answer: 'Antioxidants such as Vitamin E and Ferulic Acid help defend the look of skin against the dulling effects of daily environmental stress and can stabilise Vitamin C formulas. They support a healthier, more radiant-looking complexion over time and pair well with brightening routines. Pairing antioxidants with daily SPF is the most effective approach for protecting the look of your skin.',
      products: ['serum-01'],
      tags: ['antioxidants', 'vitamin-e', 'ferulic-acid', 'protection', 'ingredient'],
      safety_level: 'low'
    },

    /* ── Pigmentation, marks & even tone ── */
    {
      id: 'qa_037',
      category: 'pigmentation',
      question: 'What can help with dark marks left behind after spots?',
      answer: 'Marks left after blemishes (post-blemish darkening) often fade gradually, and the right cosmetic actives can support a more even look over time. Our Glow + Marks Serum combines Tranexamic Acid, Alpha Arbutin, Niacinamide, and stable Vitamin C for exactly this. Consistency over 8–12 weeks and daily SPF make the biggest difference. If marks are very dark, raised, or changing, see a dermatologist.',
      products: ['serum-01'],
      tags: ['dark-marks', 'post-blemish', 'pih', 'even-tone', 'pigmentation'],
      safety_level: 'low'
    },
    {
      id: 'qa_038',
      category: 'pigmentation',
      question: 'My skin tone looks uneven and patchy. What should I use?',
      answer: 'Uneven-looking tone responds well to a steady brightening routine. The Glow + Marks Serum is our most targeted option, with Tranexamic Acid and Alpha Arbutin to support a more uniform appearance. Pair it with daily SPF, since sun exposure is the single biggest factor in uneven tone. Results are gradual — think months, not days.',
      products: ['serum-01'],
      tags: ['uneven-tone', 'patchy', 'brightening', 'spf', 'pigmentation'],
      safety_level: 'low'
    },
    {
      id: 'qa_039',
      category: 'pigmentation',
      question: 'Can a serum help with the look of melasma?',
      answer: 'Melasma is a medical pigmentation pattern that is best assessed and managed with a dermatologist. Cosmetically, gentle brightening ingredients like Tranexamic Acid, Alpha Arbutin, and Niacinamide in our Glow + Marks Serum may help support a more even-looking complexion, and rigorous daily SPF is essential. We cannot diagnose or treat melasma — please consult a professional for a tailored plan.',
      products: ['serum-01'],
      tags: ['melasma', 'pigmentation', 'dermatologist', 'spf', 'caution'],
      safety_level: 'caution'
    },
    {
      id: 'qa_040',
      category: 'pigmentation',
      question: 'How long does it take to see brighter, more even skin?',
      answer: 'Cosmetic brightening is a gradual process. Most people begin to notice a fresher, more even look around 4–6 weeks, with clearer results by 8–12 weeks of consistent use. Daily SPF is non-negotiable for brightening to show, because unprotected sun exposure works against it. Patience and consistency are the key.',
      products: ['serum-01'],
      tags: ['timeline', 'brightening', 'consistency', 'spf', 'pigmentation'],
      safety_level: 'low'
    },
    {
      id: 'qa_041',
      category: 'pigmentation',
      question: 'Can I use Vitamin C and Niacinamide together?',
      answer: 'Yes. The old idea that they cancel each other out has been widely set aside — modern stable forms of Vitamin C, like the 3-O-Ethyl Ascorbic Acid in our Glow + Marks Serum, layer comfortably with Niacinamide. In fact they are formulated together in that serum to support brightness and even tone as a team.',
      products: ['serum-01'],
      tags: ['vitamin-c', 'niacinamide', 'layering', 'myth', 'pigmentation'],
      safety_level: 'low'
    },

    /* ── Glow, dullness & radiance ── */
    {
      id: 'qa_042',
      category: 'brightening',
      question: 'My skin looks tired and lacks radiance. What helps?',
      answer: 'Tired, flat-looking skin is often a mix of dehydration and slow surface renewal. The Glow + Marks Serum supports luminosity with Bakuchiol, Licorice, and antioxidants, and pairing it with the Peptide Repair Barrier Serum brings back a plump, fresh look. Good sleep, hydration, and daily SPF amplify the effect.',
      products: ['serum-01', 'serum-02'],
      tags: ['dull', 'tired', 'radiance', 'glow', 'brightening'],
      safety_level: 'low'
    },
    {
      id: 'qa_043',
      category: 'brightening',
      question: 'I want glowing skin for an event. What gives a quick boost?',
      answer: 'For a fast, healthy-looking glow, mist with the Support Spray, layer the Peptide Repair Barrier Serum on damp skin, and finish with the Glow + Marks Serum. For an event, a few drops of our flagship firming serum can also give an immediate smooth, lifted finish thanks to its film-forming polymers. Avoid trying brand-new strong actives right before an occasion.',
      products: ['serum-01', 'serum-02'],
      tags: ['glow', 'event', 'quick-boost', 'radiance', 'brightening'],
      safety_level: 'low'
    },
    {
      id: 'qa_044',
      category: 'brightening',
      question: 'Which serum is best for someone in their twenties wanting glow and clear marks?',
      answer: 'For glow plus fading the look of marks — a very common goal in the 18–35 range — the Glow + Marks Serum is an ideal hero. It pairs stable Vitamin C, Niacinamide, Tranexamic Acid, and Alpha Arbutin to support radiance and even tone in one step. Add the Peptide Repair Barrier Serum for comfort and daily SPF to protect your progress.',
      products: ['serum-01', 'serum-02'],
      tags: ['twenties', 'glow', 'marks', 'brightening', 'age-group'],
      safety_level: 'low'
    },

    /* ── Anti-ageing, peptides & firmness ── */
    {
      id: 'qa_045',
      category: 'age-support',
      question: 'What is the best serum for firmness and a lifted look in my late thirties?',
      answer: 'For firmness and a smoother, more lifted look from the mid-thirties onward, the Caviar Lift Serum is the premium choice — it combines peptides, caviar extract, and instant-tightening Pullulan for both immediate and conditioned-over-time results. If you also want night-time renewal, the Retinal Bio-Lift Night Serum (encapsulated Retinaldehyde) can be alternated on separate evenings. Always pair with SPF.',
      products: ['serum-03'],
      tags: ['firmness', 'lift', 'thirties', 'peptides', 'age-support'],
      safety_level: 'low'
    },
    {
      id: 'qa_046',
      category: 'age-support',
      question: 'Should I use peptides or retinol for ageing concerns?',
      answer: 'They play different roles and can complement each other. A retinoid (the encapsulated Retinaldehyde in our Retinal Bio-Lift Night Serum) supports renewal and smoothness but needs slow introduction and SPF. Peptides (in our Caviar Lift, Peptide Repair Barrier, and Neuro Peptide Eye serums) are gentle, support firmness and a conditioned feel, and suit sensitive skin. A common approach is peptides nightly and the retinoid on a couple of separate evenings — never layered on the exact same areas at first.',
      products: ['serum-03', 'serum-02'],
      tags: ['peptides', 'retinol', 'anti-ageing', 'comparison', 'age-support'],
      safety_level: 'medium'
    },
    {
      id: 'qa_047',
      category: 'age-support',
      question: 'Is it too early to start anti-ageing products in my twenties?',
      answer: 'Prevention-focused care in your twenties is mostly about hydration, antioxidants, and daily SPF — these protect the look of your skin long term. Gentle options like the Glow + Marks Serum with Bakuchiol and Peptides are a lovely, low-risk start. Strong retinol is not necessary this early unless your skin tolerates it well and you have a specific goal.',
      products: ['serum-01', 'serum-02'],
      tags: ['prevention', 'twenties', 'antioxidants', 'spf', 'age-support'],
      safety_level: 'low'
    },
    {
      id: 'qa_048',
      category: 'age-support',
      question: 'What helps with the look of fine lines around the eyes and forehead?',
      answer: 'Expression lines look softer when skin is well hydrated and supported. Peptides and gentle smoothing actives help: our flagship firming serum gives an immediate smoother appearance, while the Caviar Lift Serum supports renewal over time. Apply gently, avoid dragging the delicate eye area, and keep the skin well moisturised. Consistent SPF prevents lines from looking deeper.',
      products: ['serum-03', 'support-cream'],
      tags: ['fine-lines', 'eyes', 'forehead', 'peptides', 'age-support'],
      safety_level: 'low'
    },
    {
      id: 'qa_049',
      category: 'age-support',
      question: 'Does the instant-tightening effect of a firming serum last?',
      answer: 'The immediate tightening from film-forming polymers like pullulan is a cosmetic, surface effect that lasts through the day and resets after cleansing — wonderful for a smooth, lifted look. The peptides, caviar, and conditioning ingredients in the same serum work more gradually to support a firmer-feeling, well-conditioned complexion with consistent use. So you get both an instant and a long-game benefit.',
      products: ['serum-03'],
      tags: ['instant-tightening', 'firming', 'longevity', 'peptides', 'age-support'],
      safety_level: 'low'
    },

    /* ── Luxury / flagship ── */
    {
      id: 'qa_050',
      category: 'comparison',
      question: 'What makes the flagship firming serum a premium product?',
      answer: 'Our flagship firming serum is built around a luxury combination: peptide blends for firmness, caviar extract and marine-derived conditioning ingredients for nourishment, instant-tightening polymers for an immediate lifted look, plus Niacinamide and Hyaluronic Acid for tone and hydration. It is designed as a sensorial, high-performance step for those who want both immediate elegance and long-term support — typically suiting skin from the mid-thirties onward.',
      products: ['serum-03'],
      tags: ['flagship', 'luxury', 'caviar', 'peptides', 'comparison'],
      safety_level: 'low'
    },
    {
      id: 'qa_051',
      category: 'comparison',
      question: 'How do your serums compare to high-end luxury brands?',
      answer: 'Our serums are formulated around the same families of proven, well-regarded ingredients found in benchmark luxury skincare — stable Vitamin C and brightening actives, peptide complexes, ceramides and barrier lipids, caviar and marine conditioning ingredients, and film-forming polymers. The focus is on thoughtful, effective formulas and an elevated experience. We describe benefits in cosmetic terms and never promise to match or outperform any specific brand.',
      products: ['serum-01', 'serum-03'],
      tags: ['luxury', 'comparison', 'value', 'ingredients', 'comparison'],
      safety_level: 'low'
    },

    /* ── Barrier & recovery ── */
    {
      id: 'qa_052',
      category: 'barrier',
      question: 'How do I know if my skin barrier is damaged?',
      answer: 'A stressed barrier often looks and feels tight, dry, flaky, stingy, or more reactive than usual, and products that normally feel fine may sting. The kindest response is to simplify: pause exfoliating actives and retinol, and focus on barrier repair with our Peptide Repair Barrier Serum and Support Cream until comfort returns, usually within 1–2 weeks. If skin is broken, weeping, or painful, see a professional.',
      products: ['serum-02', 'support-cream'],
      tags: ['barrier-damage', 'recovery', 'simplify', 'sensitive', 'barrier'],
      safety_level: 'medium'
    },
    {
      id: 'qa_053',
      category: 'barrier',
      question: 'What is barrier repair and which ingredients support it?',
      answer: 'Barrier repair means restoring the skin’s protective outer layer so it holds moisture and feels comfortable. The most supportive ingredients are ceramides, cholesterol, fatty acids, Squalane, Panthenol, and Beta-Glucan — all of which feature in our Peptide Repair Barrier Serum and Support Cream. Peptides further help skin feel resilient and conditioned.',
      products: ['serum-02', 'support-cream'],
      tags: ['barrier-repair', 'ceramides', 'squalane', 'peptides', 'barrier'],
      safety_level: 'low'
    },
    {
      id: 'qa_054',
      category: 'barrier',
      question: 'Can I use the Peptide barrier serum every day?',
      answer: 'Yes — barrier and peptide support serums are gentle and designed for daily use, morning and evening. Apply after cleansing and before your moisturiser. They are a reassuring base layer in almost any routine and pair well with more targeted actives used on alternate days.',
      products: ['serum-02'],
      tags: ['daily-use', 'barrier', 'peptides', 'gentle', 'barrier'],
      safety_level: 'low'
    },

    /* ── Sensitivity & redness ── */
    {
      id: 'qa_055',
      category: 'sensitivity',
      question: 'Everything seems to irritate my skin. Where do I begin?',
      answer: 'When skin is easily irritated, the goal is a minimal, soothing routine. Start with just a gentle cleanser, the Exosome PDRN Repair Serum or Peptide Repair Barrier Serum, and the Support Cream. Patch test, introduce one product at a time over several weeks, and avoid strong actives entirely until skin feels stable. If irritation is severe or persistent, a dermatologist can help identify the cause.',
      products: ['serum-04', 'serum-02', 'support-cream'],
      tags: ['irritation', 'sensitive', 'minimal-routine', 'calm', 'sensitivity'],
      safety_level: 'medium'
    },
    {
      id: 'qa_056',
      category: 'redness',
      question: 'My cheeks look flushed and red. What can calm them?',
      answer: 'A flushed, red-looking complexion can be soothed with calming ingredients like Centella, Madecassoside, and Beta-Glucan — all in our Exosome PDRN Repair Serum. Avoid hot water, harsh scrubs, and strong actives while skin settles, and protect with SPF. If redness is persistent, comes with bumps or visible vessels, or feels warm and uncomfortable, a dermatologist can advise.',
      products: ['serum-04'],
      tags: ['redness', 'flushing', 'calm', 'centella', 'redness'],
      safety_level: 'low'
    },
    {
      id: 'qa_057',
      category: 'sensitivity',
      question: 'Can sensitive skin use Vitamin C or brightening serums?',
      answer: 'Often yes, if you choose gentle forms and go slowly. The stable 3-O-Ethyl Ascorbic Acid and Alpha Arbutin in our Glow + Marks Serum are better tolerated than harsh L-ascorbic acid. Patch test, start a few times a week, and buffer with a barrier serum or moisturiser. If you notice persistent stinging, scale back and prioritise calming care first.',
      products: ['serum-01', 'serum-02'],
      tags: ['sensitive', 'vitamin-c', 'brightening', 'gentle', 'sensitivity'],
      safety_level: 'low'
    },

    /* ── Oily, congestion & breakouts ── */
    {
      id: 'qa_058',
      category: 'oily',
      question: 'My skin gets shiny within hours. How do I control oil?',
      answer: 'Shine is often the skin overproducing oil, sometimes when it is actually dehydrated. Niacinamide helps support balance — it features across our range, including the Glow + Marks and Retinal Bio-Lift Night serums. Use a lightweight hydrator rather than skipping moisturiser, since stripping the skin can make oil worse. The Facial Support Spray is a refreshing, light option for very oily skin.',
      products: ['serum-05'],
      tags: ['oily', 'shine', 'niacinamide', 'zinc', 'oily'],
      safety_level: 'low'
    },
    {
      id: 'qa_059',
      category: 'oily',
      question: 'I keep getting clogged pores and blackheads on my nose. What helps?',
      answer: 'Blackhead-prone, congested areas often respond well to gentle renewal over time. Our Retinal Bio-Lift Night Serum (encapsulated Retinaldehyde) supports a clearer-looking surface and more refined pores. Start every other evening, keep the rest of your routine simple and non-greasy, and be patient — congestion clears gradually, not overnight.',
      products: ['serum-05'],
      tags: ['blackheads', 'congestion', 'pores', 'salicylic', 'oily'],
      safety_level: 'low'
    },
    {
      id: 'qa_060',
      category: 'oily',
      question: 'Can I use a clarifying serum if I also have dry patches?',
      answer: 'Yes, with care. Combination skin can use a clarifying serum where it is oily and a barrier or hydration serum where it is dry — a technique called multi-masking or zone treatment. Apply the Retinal Bio-Lift Night Serum to congested areas and the Hydration or Barrier serum to drier zones, and always moisturise. Lower the clarifying frequency if dryness increases.',
      products: ['serum-05', 'serum-02'],
      tags: ['combination', 'dry-patches', 'zone-treatment', 'clarifying', 'oily'],
      safety_level: 'low'
    },
    {
      id: 'qa_061',
      category: 'oily',
      question: 'Are your serums non-comedogenic / will they clog pores?',
      answer: 'Our serums are formulated to be lightweight and pore-friendly, using non-comedogenic hydrators like Hyaluronic Acid, Glycerin, and Squalane rather than heavy occlusive oils. Oily and combination skin generally tolerate them well. Everyone is individual, though, so if you are prone to congestion, introduce one product at a time and watch how your skin responds.',
      products: ['serum-02', 'serum-05'],
      tags: ['non-comedogenic', 'clogging', 'oily', 'lightweight', 'oily'],
      safety_level: 'low'
    },

    /* ── Hydration & dehydration ── */
    {
      id: 'qa_062',
      category: 'hydration',
      question: 'What is the difference between dry skin and dehydrated skin?',
      answer: 'Dry skin is a skin type that lacks oil and tends to feel rough and flaky; dehydrated skin is a temporary condition where skin lacks water and can affect even oily skin, looking dull and feeling tight. For dehydration, humectants like Hyaluronic Acid and Glycerin in our Peptide Repair Barrier Serum help, while dry skin also benefits from richer lipids in the Support Cream.',
      products: ['serum-02', 'support-cream'],
      tags: ['dry', 'dehydrated', 'difference', 'hydration', 'hydration'],
      safety_level: 'low'
    },
    {
      id: 'qa_063',
      category: 'hydration',
      question: 'How do I get the most out of a hyaluronic acid serum?',
      answer: 'Apply your Peptide Repair Barrier Serum to slightly damp skin — misting first with the Support Spray works well — so the humectants have water to bind. Then seal with a moisturiser like the Support Cream to lock it in. In very dry air, applying to dry skin without sealing can occasionally feel tight, so the moisturiser step matters.',
      products: ['serum-02', 'support-spray', 'support-cream'],
      tags: ['hyaluronic-acid', 'application', 'damp-skin', 'seal', 'hydration'],
      safety_level: 'low'
    },
    {
      id: 'qa_064',
      category: 'hydration',
      question: 'My skin feels dry and flaky in winter. What should I add?',
      answer: 'Cold, dry air pulls moisture from the skin. Layer the Peptide Repair Barrier Serum under the richer Support Cream, and consider adding the Peptide Repair Barrier Serum if skin feels compromised. Avoid over-cleansing and very hot water, which strip protective lipids. A few drops of facial oil over your cream can help seal extra dry areas.',
      products: ['serum-02', 'support-cream'],
      tags: ['winter', 'dry', 'flaky', 'layering', 'hydration'],
      safety_level: 'low'
    },

    /* ── Layering & routine order ── */
    {
      id: 'qa_065',
      category: 'layering',
      question: 'Can I use Vitamin C in the morning and Retinol at night?',
      answer: 'Yes, this is a classic effective pairing. Use the Glow + Marks Serum (stable Vitamin C) in the morning under SPF to support brightness and protection, and the Retinal Bio-Lift Night Serum (encapsulated Retinaldehyde) in the evening for renewal. Introduce the retinoid slowly and keep the rest of your routine gentle while skin adjusts.',
      products: ['serum-01', 'serum-03'],
      tags: ['vitamin-c', 'retinol', 'am-pm', 'layering', 'layering'],
      safety_level: 'medium'
    },
    {
      id: 'qa_066',
      category: 'layering',
      question: 'Which ingredients should I not use at the same time?',
      answer: 'A few gentle guidelines: avoid layering two strong exfoliating actives (e.g. an AHA and a BHA, or acids plus retinol) on the same area on the same night, as this raises irritation risk. Space them on alternate evenings instead. Hydrating, soothing, and barrier ingredients like HA, ceramides, peptides, Niacinamide, and Centella layer comfortably with almost anything.',
      products: ['serum-05'],
      tags: ['combining', 'actives', 'irritation', 'alternate', 'layering'],
      safety_level: 'medium'
    },
    {
      id: 'qa_067',
      category: 'layering',
      question: 'How long should I wait between serum layers?',
      answer: 'Around 30–60 seconds is usually enough for one layer to settle before the next — you do not need to wait for full drying. Apply thinnest to thickest. With potent actives like retinol, some people prefer to wait a couple of minutes and apply a moisturiser buffer first if their skin is sensitive.',
      products: ['support-cream'],
      tags: ['wait-time', 'layering', 'application', 'order', 'layering'],
      safety_level: 'low'
    },
    {
      id: 'qa_068',
      category: 'routine',
      question: 'Can you suggest a simple morning and evening routine?',
      answer: 'A simple, effective template — Morning: cleanse, optional Support Spray, a treatment serum (e.g. Brightening), moisturiser, then SPF. Evening: cleanse, a treatment or repair serum (e.g. Barrier or Age), then Support Cream. Keep mornings about protection and evenings about repair. Introduce any new active one at a time.',
      products: ['serum-01', 'serum-02', 'support-cream'],
      tags: ['routine', 'am-pm', 'simple', 'template', 'routine'],
      safety_level: 'low'
    },

    /* ── SPF ── */
    {
      id: 'qa_069',
      category: 'spf',
      question: 'Why is SPF so important with brightening and retinol products?',
      answer: 'Brightening actives work to even tone while unprotected sun exposure does the opposite, so without SPF you are working against yourself. Retinol and exfoliating acids can also make skin more sun-sensitive. Daily SPF 30+ protects your progress and the look of your skin long term. Apply it as the final morning step and reapply when out for long periods.',
      products: [],
      tags: ['spf', 'brightening', 'retinol', 'protection', 'spf'],
      safety_level: 'low'
    },
    {
      id: 'qa_070',
      category: 'spf',
      question: 'Do I need SPF indoors or on cloudy days?',
      answer: 'UVA rays, which most affect the long-term look of skin, pass through clouds and windows, so daily SPF is a good habit even indoors near windows or on overcast days. If you are away from windows all day you need less, but for most people a daily SPF 30+ is the simplest, most protective routine.',
      products: [],
      tags: ['spf', 'indoors', 'cloudy', 'uva', 'spf'],
      safety_level: 'low'
    },

    /* ── Pregnancy & life stages ── */
    {
      id: 'qa_071',
      category: 'pregnancy',
      question: 'Which actives should I avoid while pregnant or breastfeeding?',
      answer: 'Retinoids are the main ingredients generally avoided during pregnancy and breastfeeding, so we suggest pausing our Retinal Bio-Lift Night Serum and checking with your healthcare provider. Gentle options like the Peptide Repair Barrier Serum, Exosome PDRN Repair Serum, the retinol-free Caviar Lift Serum, the Neuro Peptide Eye & Smile Line Serum, and the Support Cream are typically considered suitable. Always confirm with your midwife or doctor.',
      products: ['serum-02', 'serum-04', 'support-cream'],
      tags: ['pregnancy', 'breastfeeding', 'retinol-free', 'safe', 'caution'],
      safety_level: 'caution'
    },
    {
      id: 'qa_072',
      category: 'pregnancy',
      question: 'Can I still use brightening and hydration serums during pregnancy?',
      answer: 'Many gentle cosmetic ingredients such as Hyaluronic Acid, Glycerin, Niacinamide, Peptides, and stable Vitamin C are commonly considered fine during pregnancy, so our Peptide Repair Barrier, Glow + Marks, and Exosome PDRN Repair serums are often suitable. Because every pregnancy is different, we always recommend confirming your specific routine with your midwife or doctor. We avoid making medical claims.',
      products: ['serum-02', 'serum-01'],
      tags: ['pregnancy', 'brightening', 'hydration', 'safe', 'caution'],
      safety_level: 'caution'
    },
    {
      id: 'qa_073',
      category: 'age-support',
      question: 'I am a teenager with oily, breakout-prone skin. What is safe to use?',
      answer: 'For younger skin, the kindest approach is gentle and simple: a mild cleanser, a lightweight hydrator, and SPF. Our Support Spray and a gentle hydrating serum are good, low-risk choices. Avoid strong anti-ageing actives, which are unnecessary at this stage. If breakouts are persistent, painful, or distressing, involving a parent or guardian and seeing a professional is a great step.',
      products: ['support-spray', 'serum-02'],
      tags: ['teen', 'under-18', 'gentle', 'oily', 'caution'],
      safety_level: 'caution'
    },

    /* ── Climate, storage & stability (Pakistan launch context) ── */
    {
      id: 'qa_074',
      category: 'climate',
      question: 'Which serums suit a hot, humid climate?',
      answer: 'In heat and humidity, lightweight, fast-absorbing formulas feel best. Fluid serums like the Glow + Marks and Exosome PDRN Repair, plus the refreshing Facial Support Spray, sit comfortably without feeling heavy. Layer lightly, choose a light moisturiser or even just the spray on very humid days, and never skip a non-greasy daily SPF.',
      products: ['serum-02', 'serum-01', 'support-spray'],
      tags: ['hot-climate', 'humid', 'lightweight', 'spf', 'climate'],
      safety_level: 'low'
    },
    {
      id: 'qa_075',
      category: 'climate',
      question: 'Does heat affect Vitamin C serums?',
      answer: 'Pure L-ascorbic acid is notoriously unstable and can oxidise and turn yellow in heat, losing effectiveness. This is exactly why our Glow + Marks Serum uses 3-O-Ethyl Ascorbic Acid, a far more heat-stable form better suited to warm climates. Still, store it away from direct sun and heat, and keep the cap closed. A cool, dark cupboard is ideal.',
      products: ['serum-01'],
      tags: ['heat', 'vitamin-c', 'stability', 'storage', 'climate'],
      safety_level: 'low'
    },
    {
      id: 'qa_076',
      category: 'climate',
      question: 'My skin is oily in summer but dry in winter. Should I change my routine?',
      answer: 'Yes — adapting seasonally is smart. In hot, humid months lean on lightweight hydration and a clarifying serum where needed; in cold, dry months add richer moisture with the Support Cream and the Peptide Repair Barrier Serum. Keep your core actives consistent, and adjust the moisturiser and frequency to how your skin feels.',
      products: ['serum-05', 'support-cream', 'serum-02'],
      tags: ['seasonal', 'summer', 'winter', 'adapt', 'climate'],
      safety_level: 'low'
    },
    {
      id: 'qa_077',
      category: 'storage',
      question: 'How should I store my serums and how long do they last?',
      answer: 'Store serums upright in a cool, dry place away from direct sunlight and heat — a bathroom cabinet or bedroom drawer is ideal, and a fridge is fine for a refreshing feel. Most opened serums are best used within their period-after-opening window (often 6–12 months). If a product changes colour, smell, or texture noticeably, it is best to stop using it.',
      products: [],
      tags: ['storage', 'shelf-life', 'expiry', 'care', 'storage'],
      safety_level: 'low'
    },
    {
      id: 'qa_078',
      category: 'storage',
      question: 'Can I keep my serums in the fridge?',
      answer: 'Yes — refrigerating serums is optional but can feel lovely and soothing, especially for hydrating, calming, and eye-area products in hot weather. It can also help heat-sensitive formulas stay fresh. Just avoid freezing, and let very cold products warm slightly if they feel too thick to spread.',
      products: ['serum-02', 'serum-04'],
      tags: ['fridge', 'storage', 'cooling', 'hot-weather', 'storage'],
      safety_level: 'low'
    },

    /* ── Application & technique ── */
    {
      id: 'qa_079',
      category: 'routine',
      question: 'How many drops of serum should I use?',
      answer: 'For most serums, 3–4 drops (about a pea-sized amount) is enough to cover the whole face. More is not better — excess can pill or simply not absorb. Press and gently smooth it in rather than rubbing hard. With rich or film-forming serums like our flagship firming serum, a little goes a long way.',
      products: [],
      tags: ['how-much', 'drops', 'application', 'technique', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_080',
      category: 'routine',
      question: 'Why does my serum pill or roll off?',
      answer: 'Pilling usually happens when too much product is applied, layers are stacked too quickly, or a formula does not sit well with another (often silicone-rich textures). Use less, allow 30–60 seconds between layers, apply to slightly damp skin, and press rather than rub. Letting each layer settle solves most pilling.',
      products: [],
      tags: ['pilling', 'application', 'layering', 'technique', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_081',
      category: 'routine',
      question: 'Should serum go on damp or dry skin?',
      answer: 'Humectant-rich serums (like our Peptide Repair Barrier Serum) work beautifully on slightly damp skin, as they draw in the surface water — mist with the Support Spray first. Oil-based or anhydrous actives often prefer dry skin. As a simple rule: hydrating serums on damp skin, then seal with moisturiser.',
      products: ['serum-02', 'support-spray'],
      tags: ['damp', 'dry', 'application', 'humectant', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_082',
      category: 'routine',
      question: 'Can I use a serum around my eyes?',
      answer: 'Many gentle hydrating and peptide serums can be used carefully around the orbital bone, but avoid getting active or exfoliating serums (retinol, acids, strong Vitamin C) too close to the eyes, as the skin there is delicate and can sting. Pat gently with your ring finger and keep a safe margin. If you want, a dedicated eye product is a comfortable option.',
      products: ['serum-02', 'support-cream'],
      tags: ['eye-area', 'gentle', 'application', 'delicate', 'routine'],
      safety_level: 'low'
    },

    /* ── Frequency & expectations ── */
    {
      id: 'qa_083',
      category: 'retinol',
      question: 'My skin is peeling and red after starting retinol. Is that normal?',
      answer: 'Mild dryness or flaking when first starting retinol is common as skin adjusts, but redness, peeling, and stinging mean you are going too fast. Scale back to once or twice a week, always moisturise with the Support Cream, and buffer by applying retinol over moisturiser. If irritation is significant or persistent, pause and focus on barrier repair, and consider seeing a professional.',
      products: ['serum-03', 'support-cream', 'serum-02'],
      tags: ['retinol', 'peeling', 'irritation', 'adjustment', 'retinol'],
      safety_level: 'medium'
    },
    {
      id: 'qa_084',
      category: 'routine',
      question: 'How long before I see results from a new serum?',
      answer: 'Hydration and glow can look improved within days, while tone, texture, fine lines, and marks need consistent use over 8–12 weeks to show meaningful change — skin renews gradually. Instant-tightening serums give an immediate cosmetic lift each time you apply them. Give any active a fair, consistent trial before judging it.',
      products: [],
      tags: ['timeline', 'results', 'expectations', 'consistency', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_085',
      category: 'routine',
      question: 'Can I use too many active ingredients at once?',
      answer: 'Yes — over-loading on actives is one of the most common causes of irritation and a stressed barrier. A focused routine with one or two well-chosen actives, supported by hydration and SPF, usually outperforms a shelf full of products. If your skin feels tight, stingy, or reactive, simplify back to basics and rebuild slowly.',
      products: ['serum-02', 'support-cream'],
      tags: ['over-use', 'actives', 'simplify', 'barrier', 'routine'],
      safety_level: 'medium'
    },

    /* ── Lifestyle ── */
    {
      id: 'qa_086',
      category: 'routine',
      question: 'Does diet, water, or sleep affect my skin?',
      answer: 'Lifestyle plays a real supporting role: good sleep, hydration, a balanced diet, and managing stress all help skin look its best, while skincare works on the surface. No serum replaces these foundations, and no product can guarantee results. Think of a thoughtful routine and healthy habits as partners.',
      products: [],
      tags: ['lifestyle', 'diet', 'sleep', 'holistic', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_087',
      category: 'routine',
      question: 'Does air travel or air conditioning dry out my skin?',
      answer: 'Yes — cabin air and air conditioning are very low in humidity and can leave skin feeling tight and dehydrated. Mist with the Support Spray, layer the Peptide Repair Barrier Serum, and seal with the Support Cream before and during long flights. Keeping a travel mist handy is a simple way to stay comfortable.',
      products: ['support-spray', 'serum-02', 'support-cream'],
      tags: ['travel', 'air-conditioning', 'dehydration', 'hydration', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_088',
      category: 'routine',
      question: 'Can men use these serums too?',
      answer: 'Absolutely — skincare ingredients work the same regardless of gender. The same goal-based approach applies: hydration for tightness, brightening for marks and tone, clarifying for oil and congestion, barrier or calm for sensitivity. Choose by concern, not by category. Many men appreciate the lightweight, fast-absorbing textures.',
      products: ['serum-02', 'serum-05'],
      tags: ['men', 'unisex', 'concern-based', 'all', 'routine'],
      safety_level: 'low'
    },

    /* ── Comparisons & choosing ── */
    {
      id: 'qa_089',
      category: 'comparison',
      question: 'I do not know which serum to choose. How do I decide?',
      answer: 'Start from your main concern. Tight, dry, or barrier-stressed? Peptide Repair Barrier Serum. Dull or uneven with marks? Glow + Marks Serum. Sensitive, red, or recovering from blemishes? Exosome PDRN Repair Serum. Texture, pores, or night renewal? Retinal Bio-Lift Night Serum. Firmness and instant lift? Caviar Lift Serum. Tired eyes or smile lines? Neuro Peptide Eye & Smile Line Serum. You can also use the Quick Match consultation for a tailored suggestion in about a minute.',
      products: ['serum-02', 'serum-01'],
      tags: ['choosing', 'concern', 'guidance', 'quiz', 'comparison'],
      safety_level: 'low'
    },
    {
      id: 'qa_090',
      category: 'comparison',
      question: 'What is the difference between the Barrier serum and the Calm serum?',
      answer: 'The Peptide Repair Barrier Serum focuses on rebuilding and reinforcing the skin’s protective layer with ceramides, Squalane, and peptides — ideal after over-exfoliation or for chronic dryness. The Exosome PDRN Repair Serum focuses on soothing visible redness and reactivity with Centella, Madecassoside, and a vegan exosome-style complex. For a stressed, raw barrier choose Peptide Repair Barrier; for flushed, reactive redness or post-blemish recovery choose Exosome PDRN Repair. They can also be used together.',
      products: ['serum-02', 'serum-04'],
      tags: ['barrier', 'calm', 'comparison', 'difference', 'comparison'],
      safety_level: 'low'
    },
    {
      id: 'qa_091',
      category: 'comparison',
      question: 'Which serum should I use for bumpy or congested skin?',
      answer: 'It depends on the type of bumps. For rough, uneven surface texture, dryness-related roughness, oil-related congestion, blackheads, and clogged pores, the Retinal Bio-Lift Night Serum (encapsulated Retinaldehyde) supports a smoother, clearer-looking surface and refined pores over time. For bumps linked to a stressed or dry barrier, the Peptide Repair Barrier Serum helps restore comfort. Introduce the Retinal serum slowly, evening only.',
      products: ['serum-05'],
      tags: ['texture', 'clarifying', 'aha', 'bha', 'comparison'],
      safety_level: 'low'
    },
    {
      id: 'qa_092',
      category: 'comparison',
      question: 'Is the Glow serum or the Brightening serum better for me?',
      answer: 'Choose the Glow + Marks Serum if you mainly want overall radiance and a healthy, luminous look with gentle ingredients like Bakuchiol. Choose the Glow + Marks Serum if your specific concern is uneven tone, dark marks, or dullness from pigmentation, since it targets those with Vitamin C, Tranexamic Acid, and Alpha Arbutin. They can alternate on different evenings if you want both.',
      products: ['serum-01'],
      tags: ['glow', 'brightening', 'comparison', 'choosing', 'comparison'],
      safety_level: 'low'
    },

    /* ── Safety boundaries ── */
    {
      id: 'qa_093',
      category: 'safety',
      question: 'I have a painful, swollen lump on my skin. What should I do?',
      answer: 'A painful, swollen, or rapidly changing lump is something to have looked at by a doctor or dermatologist rather than treated with skincare. SIT is a cosmetic guide and cannot assess or treat anything like this. Please book an appointment with a healthcare professional for a proper evaluation. In the meantime, keep the area clean and avoid applying active products to it.',
      products: [],
      tags: ['painful', 'lump', 'swollen', 'referral', 'safety'],
      safety_level: 'caution'
    },
    {
      id: 'qa_094',
      category: 'safety',
      question: 'Can SIT tell me if I have acne, rosacea, or eczema?',
      answer: 'No — SIT is a cosmetic skincare guide and does not diagnose any skin condition. Naming conditions like acne, rosacea, or eczema requires a qualified dermatologist who can examine your skin. We can suggest gentle, supportive cosmetic routines for comfort, but for a diagnosis and treatment plan please see a professional.',
      products: [],
      tags: ['diagnosis', 'acne', 'rosacea', 'eczema', 'safety'],
      safety_level: 'caution'
    },
    {
      id: 'qa_095',
      category: 'safety',
      question: 'I am using a prescription cream. Can I add your serums?',
      answer: 'When you are on a prescription treatment, the safest step is to check with the prescribing doctor or dermatologist before adding new products, as they know your treatment plan. Never stop or change a prescription based on our guidance. If your doctor is happy, gentle hydrating and barrier-supporting products are usually the easiest companions — but always follow their advice first.',
      products: ['serum-02'],
      tags: ['prescription', 'doctor', 'compatibility', 'caution', 'safety'],
      safety_level: 'caution'
    },
    {
      id: 'qa_096',
      category: 'safety',
      question: 'My skin is burning and stinging badly after a product. What now?',
      answer: 'Stop using the product immediately and gently rinse your skin with cool water. Apply a simple, soothing moisturiser and avoid all actives until comfort returns. Persistent burning, swelling, blistering, or a spreading reaction needs prompt medical attention — please contact a doctor. Skincare should never cause significant pain, so listen to your skin.',
      products: ['support-cream'],
      tags: ['burning', 'stinging', 'reaction', 'stop', 'safety'],
      safety_level: 'caution'
    },

    /* ── Brand & product practicalities ── */
    {
      id: 'qa_097',
      category: 'ingredients',
      question: 'Are your serums suitable for vegans and free from animal testing?',
      answer: 'Our formulas are designed to be kind and considered, and where we use caviar-inspired benefits we can offer vegan caviar alternatives that deliver a similar nourishing, conditioning experience without animal-derived ingredients. For the most current details on specific products, please check the individual product page or contact our team — we are always happy to confirm.',
      products: ['serum-03'],
      tags: ['vegan', 'cruelty-free', 'caviar', 'ethics', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_098',
      category: 'ingredients',
      question: 'Are these serums fragrance-free and suitable for very sensitive skin?',
      answer: 'Our barrier and calming formulas are formulated with sensitive skin in mind, prioritising soothing, well-tolerated ingredients. If you are highly fragrance-sensitive, check the individual product page for the full ingredient list, and always patch test. The Peptide Repair Barrier and Exosome PDRN Repair serums are the gentlest starting points for very reactive skin.',
      products: ['serum-02', 'serum-04'],
      tags: ['fragrance-free', 'sensitive', 'gentle', 'patch-test', 'ingredient'],
      safety_level: 'low'
    },
    {
      id: 'qa_099',
      category: 'routine',
      question: 'How do I build a complete routine with three of your serums?',
      answer: 'A balanced three-serum approach might look like: morning — Glow + Marks Serum for tone and glow under SPF; evening — the Retinal Bio-Lift Night Serum on two nights for renewal, the Caviar Lift Serum on a couple of nights for firmness and lift, and the Peptide Repair Barrier Serum on other nights for repair. Hydrate and moisturise daily, and introduce each serum one at a time over a few weeks so your skin adjusts comfortably.',
      products: ['serum-01', 'serum-03', 'serum-02'],
      tags: ['full-routine', 'three-serums', 'am-pm', 'layering', 'routine'],
      safety_level: 'low'
    },
    {
      id: 'qa_100',
      category: 'age-support',
      question: 'Which serums suit each age group best?',
      answer: 'As a gentle guide: 18–35 often loves the Glow + Marks Serum for glow and clearing the look of marks; 25–45 benefits from the Peptide barrier and repair focus for hydration, firmness, and fine lines; and 35+ tends to enjoy our flagship firming serum for a lifted, conditioned, luxurious finish. These are starting points, not rules — always choose by your skin’s concerns and comfort, and you can mix across ranges.',
      products: ['serum-01', 'serum-02', 'serum-03'],
      tags: ['age-group', 'choosing', 'glow', 'firming', 'age-support'],
      safety_level: 'low'
    }
  ],

  /* ─────────────────────────────────────────────
     INGREDIENT BRAIN
  ───────────────────────────────────────────── */
  ingredients: {
    'hyaluronic_acid': {
      name: 'Hyaluronic Acid',
      benefit: 'Draws moisture into the skin from the environment and deeper layers',
      best_for: ['dehydrated skin', 'dry skin', 'all skin types'],
      avoid_if: [],
      usage_notes: 'Apply to slightly damp skin for best effect. Use morning and evening.',
      layering_notes: 'Pairs well with ceramides, peptides, niacinamide. Use before thicker textures.',
      sensitivity_notes: 'Very well tolerated. Suitable for sensitive skin.',
      caution: null
    },
    'niacinamide': {
      name: 'Niacinamide (Vitamin B3)',
      benefit: 'Supports barrier function, helps balance oil, supports an even-looking complexion',
      best_for: ['oily skin', 'uneven tone', 'sensitive skin', 'most skin types'],
      avoid_if: [],
      usage_notes: 'Suitable morning and evening. Stable ingredient.',
      layering_notes: 'Works well with most ingredients. Avoid pairing with high-dose Vitamin C in the same step.',
      sensitivity_notes: 'Very well tolerated. Can cause temporary flush in rare cases at high concentrations.',
      caution: null
    },
    'retinol': {
      name: 'Retinol (Vitamin A)',
      benefit: 'Supports cell turnover, fine line appearance, and skin firmness over time',
      best_for: ['age support', 'texture', 'firmness'],
      avoid_if: ['pregnancy', 'breastfeeding', 'very_sensitive', 'compromised_barrier'],
      usage_notes: 'Evening use only. Introduce slowly. Always follow with SPF next morning.',
      layering_notes: 'Do not combine with AHAs, BHAs, or Vitamin C in the same evening step.',
      sensitivity_notes: 'Can cause purging, redness, or peeling during introduction. Start 2x weekly.',
      caution: 'Avoid during pregnancy and breastfeeding. Consult a professional if on prescription Tretinoin.'
    },
    'lactic_acid': {
      name: 'Lactic Acid (AHA)',
      benefit: 'Gently exfoliates the skin surface to support smoother-looking texture',
      best_for: ['texture', 'dullness', 'dry skin'],
      avoid_if: ['very_sensitive', 'compromised_barrier'],
      usage_notes: 'Evening use preferred. Start 2–3 times per week. Use SPF next morning.',
      layering_notes: 'Do not layer with other exfoliating actives (BHA, retinol) on the same evening.',
      sensitivity_notes: 'Gentler than Glycolic Acid. Suitable for most skin types when introduced correctly.',
      caution: 'Avoid on actively irritated, raw, or sunburned skin.'
    },
    'salicylic_acid': {
      name: 'Salicylic Acid (BHA)',
      benefit: 'Oil-soluble exfoliant that supports clearer-looking pores',
      best_for: ['oily skin', 'congestion', 'blemish-prone skin'],
      avoid_if: ['dry skin', 'very_sensitive'],
      usage_notes: 'Evening use preferred. Start every other night and build up.',
      layering_notes: 'Do not combine with AHAs or retinol on the same evening.',
      sensitivity_notes: 'Can be drying. Use a lightweight moisturiser or the Support Spray alongside.',
      caution: 'High concentrations (above 2%) should be used with caution. Avoid in pregnancy.'
    },
    'ceramides': {
      name: 'Ceramides',
      benefit: 'Reinforce the skin\'s protective barrier to retain moisture and reduce sensitivity',
      best_for: ['sensitive skin', 'dry skin', 'barrier support', 'all skin types'],
      avoid_if: [],
      usage_notes: 'Morning and evening. Works best when combined with cholesterol and fatty acids.',
      layering_notes: 'Pairs with all ingredients. Use before occlusive creams.',
      sensitivity_notes: 'Extremely well tolerated. Often first recommendation for compromised skin.',
      caution: null
    },
    'vitamin_c': {
      name: 'Vitamin C (Ascorbyl Glucoside)',
      benefit: 'Antioxidant that supports brighter-looking skin and even tone appearance',
      best_for: ['dull skin', 'uneven tone', 'brightening'],
      avoid_if: ['very_sensitive'],
      usage_notes: 'Suitable morning or evening. Stable form (Ascorbyl Glucoside) is gentler than L-Ascorbic Acid.',
      layering_notes: 'Avoid combining with Niacinamide at the same time (minor interaction risk — use at different times of day).',
      sensitivity_notes: 'Can cause mild tingling at first. Reduce frequency if persistent.',
      caution: null
    },
    'centella_asiatica': {
      name: 'Centella Asiatica (Cica)',
      benefit: 'Soothing botanical that supports calmer, more comfortable-looking skin',
      best_for: ['sensitive skin', 'visible redness', 'post-procedure skin'],
      avoid_if: [],
      usage_notes: 'Morning and evening. Pairs well with barrier ingredients.',
      layering_notes: 'Works with all ingredients. Often combined with ceramides for barrier repair.',
      sensitivity_notes: 'Very gentle. One of the best-tolerated cosmetic actives.',
      caution: null
    },
    'retinaldehyde': {
      name: 'Retinaldehyde (Retinal)',
      benefit: 'An advanced retinoid that supports renewal, the look of fine lines, smoother texture, and refined pores',
      best_for: ['texture', 'fine lines', 'pores', 'night renewal', 'adult acne-prone skin'],
      avoid_if: ['pregnancy', 'breastfeeding', 'very_sensitive', 'compromised_barrier'],
      usage_notes: 'Evening use only. In our range it is encapsulated for gentleness in the Retinal Bio-Lift Night Serum. Introduce slowly and use SPF the next morning.',
      layering_notes: 'Do not combine with AHAs, BHAs, or Vitamin C in the same evening step.',
      sensitivity_notes: 'Generally better tolerated than older retinoids, but can still cause dryness during introduction. Start 2x weekly.',
      caution: 'Avoid during pregnancy and breastfeeding. Consult a professional if on prescription retinoids.'
    },
    'bakuchiol': {
      name: 'Bakuchiol',
      benefit: 'A gentle botanical that offers retinoid-like support for firmness and fine lines without typical retinoid irritation',
      best_for: ['sensitive skin', 'fine lines', 'first-time age support'],
      avoid_if: [],
      usage_notes: 'Suitable morning or evening. In our range it pairs with Retinaldehyde in the Retinal Bio-Lift Night Serum to soften its introduction.',
      layering_notes: 'Layers well with most ingredients including peptides and HA.',
      sensitivity_notes: 'Very well tolerated, including by many who cannot use retinoids.',
      caution: null
    },
    'peptides': {
      name: 'Peptides (Signal Peptides)',
      benefit: 'Support a firmer, smoother, more conditioned-looking complexion over time',
      best_for: ['firmness', 'fine lines', 'barrier support', 'sensitive skin'],
      avoid_if: [],
      usage_notes: 'Morning and evening. Feature in our Caviar Lift, Peptide Repair Barrier, and Neuro Peptide Eye & Smile Line serums.',
      layering_notes: 'Gentle and layer-friendly. Pair comfortably with HA, ceramides, and Niacinamide.',
      sensitivity_notes: 'Very well tolerated. Suitable for reactive skin.',
      caution: null
    },
    'exosomes_pdrn': {
      name: 'Exosome-style Complex & PDRN / Marine DNA',
      benefit: 'Repair-focused actives that support the look of recovery, calmer redness, and a smooth, glass-skin finish',
      best_for: ['post-blemish recovery', 'visible redness', 'barrier support', 'dull or tired skin'],
      avoid_if: [],
      usage_notes: 'Morning and evening. Featured in our Exosome PDRN Repair Serum.',
      layering_notes: 'Gentle and layer-friendly under heavier serums or cream.',
      sensitivity_notes: 'Very well tolerated, suitable for sensitive and recovering skin.',
      caution: null
    },
    'tranexamic_acid': {
      name: 'Tranexamic Acid',
      benefit: 'Supports a more even-looking tone and helps soften the appearance of dark marks and discolouration',
      best_for: ['uneven tone', 'acne marks', 'pigmentation appearance', 'brightening'],
      avoid_if: [],
      usage_notes: 'Morning and evening. Featured in our Glow + Marks Serum alongside stable Vitamin C and Alpha Arbutin.',
      layering_notes: 'Pairs well with Niacinamide, Alpha Arbutin, and HA.',
      sensitivity_notes: 'Gentle and well tolerated by most skin types.',
      caution: null
    },
    'caffeine': {
      name: 'Caffeine',
      benefit: 'Helps refresh a puffy, tired-looking appearance, especially around the eyes',
      best_for: ['puffiness', 'tired eyes', 'dark circle appearance'],
      avoid_if: [],
      usage_notes: 'Morning and evening. Featured in our Neuro Peptide Eye & Smile Line Serum.',
      layering_notes: 'Layers well with peptides, Niacinamide, and HA.',
      sensitivity_notes: 'Very gentle, suitable for the delicate eye area.',
      caution: null
    }
  },

  /* ─────────────────────────────────────────────
     PHOTO ANALYSIS WORDING GUIDE
  ───────────────────────────────────────────── */
  photoLabels: {
    visible_dryness:         'There may be signs of dryness or dehydration in some areas.',
    dehydration:             'The skin looks like it may benefit from additional hydration.',
    dullness:                'The skin appears to have a lower level of radiance than optimal.',
    uneven_tone:             'There appears to be some variation in skin tone visible in the photo.',
    visible_redness:         'The photo appears to show some areas of visible redness.',
    shine_oiliness:          'There may be visible shine, which can suggest some oiliness.',
    congestion_appearance:   'There may be some visible congestion or pore appearance.',
    rough_texture:           'The skin surface appears to have some texture variation.',
    fine_line_appearance:    'There may be some fine line appearance visible in the photo.',
    barrier_stress:          'The skin shows patterns that may suggest barrier stress.',
    severe_concern:          'The photo shows a pattern that may need professional assessment. SIT recommends speaking with a dermatologist.'
  },

  /* ─────────────────────────────────────────────
     CHAT RESPONSE TEMPLATES
  ───────────────────────────────────────────── */
  chatResponses: {
    greeting: "Hi, I\'m SIT — your Skin Intelligence Tool. I can help you choose a serum, build a personalised routine, or answer skincare questions. Where would you like to start?",
    not_understood: "I\'m not sure I fully understood that. Could you tell me a little more about your skin concern or what you\'re looking for? For example — your main skin goal, or a product you have a question about.",
    safety_flag: "Thank you for sharing that. The symptoms you\'ve described may need professional attention. SIT is a cosmetic skincare tool and can\'t assess or diagnose medical concerns. Please speak with a dermatologist or your GP. I can still suggest gentle basic skincare if that would help.",
    out_of_scope: "That\'s outside what SIT can help with. I\'m specialised in skincare guidance and Sebble product recommendations. Is there a skin goal or routine question I can help with instead?",
    low_confidence: "I want to make sure I recommend the right products for you. Could you tell me a little more about your skin — for example, is it dry, oily, sensitive, or combination? And what\'s your main concern right now?",
    spf_reminder: "A quick note: when using active ingredients in the morning, SPF 30 or higher is important to protect the skin and maintain your results. Do you currently use SPF daily?",
    patch_test_reminder: "Before introducing any new serum, we recommend patch testing for 24–48 hours on the inner arm or behind the ear. This is especially important for sensitive skin."
  }

};

// Export for use in other scripts
if (typeof window !== 'undefined') window.SIT_KB = SIT_KB;
if (typeof module !== 'undefined') module.exports = SIT_KB;
