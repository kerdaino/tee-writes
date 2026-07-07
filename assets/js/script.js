const portfolioSamples = {
    churchGirl: {
        title: 'Biography of a Church Girl',
        category: 'Novella / Faith-based Fiction',
        sample: `
Heavens come down! That was what the King's Delight Voices managed to inspire, especially during worship sessions. From their graceful choir robes to the elegant smiles on their faces, everything about them carried rhythm, order, and beauty.

The bass and tenor voices of the men moved beneath the sweet sopranos of the women, creating a balance so full that the instrumentalists had little work left to do. Just a breath from the Holy Spirit was enough to set the whole church on a renewed Pentecost.

Once, Ese's voice soared through those church halls like a melodic haven. As assistant music director, she led with passion, believing deeply in the transforming power of the Holy Spirit. Her presence on stage was mesmerizing.

But beneath the beauty of her voice were memories she could not shake.
        `.trim()
    },
    genderPrice: {
        title: 'Gender Price',
        category: 'Short Fiction / Social Commentary',
        sample: `
As you grappled with the rusted iron bars on the gate, you watched people pace in and out with broad smiles plastered on their faces. Warm palms touched your face in a bid to cheer you up, but all you longed for was a quiet place to scream.

You did not know his name then. He did not even have a name yet. He was just a baby, endowed with the privilege of being male.

It was your first time realizing that "all good gifts come from God," but there was a borderline thinner than you thought. It scanned the gifts, qualified them, quantified them, and only then placed the "good" tag on them.

"Your mummy has finally saved my name! It's a boy!"

The words landed before you could understand them. You wanted to be happy, but something in you stepped back.
        `.trim()
    },
    loveStory: {
        title: 'A Love Story',
        category: 'Spiritual Prose / Poetic Reflection',
        sample: `
Budded in the belly of sin, it was all I knew.

I watched it birth new cages and bars - a swift comfort, until I sought freedom. Then it wrapped its hands around me and tightened its grip. The more I struggled, the more it closed in.

My muscles retreated in defeat. It became my suffocating reality, the bed of death I longed for.

Until I heard a victory song resounding from the next prisoner, and soon he was free.

I saw the light embedded in unexplainable warmth, and He was in love with me.

I could not behold Him. He was mighty. Glorious. Holy. Lovely.

Then I felt His stretched hand, His warm smile, His saving grace, His sweet sound.

"I'm too weak and filthy," I voiced.

"That's why I came," He smiled.
        `.trim()
    },
    lightman: {
        title: 'Lightman',
        category: 'Long-form Fiction / Romance & Culture',
        sample: `
"Walahi, Yaro Banza Kawai!"

Those were the last words I heard from him before driving away angry. What type of father stresses the life out of his child? Nothing I do is perfect. As if making me study engineering instead of theatre art was not enough.

Baba was only present when business brought him around. All he did was send money and make decisions. Our house was the largest in the heart of Abuja, but sometimes it felt like the walls were built to remind us who owned our lives.

I had once loved art class. For the first time, school felt alive. We were putting up a mini talent show when a girl invited me to join.

Then the principal walked in.

"Where is Abdulrahman El-Kabir?"

The class went silent.

"Pack your things and follow me. You are in the wrong class."
        `.trim()
    }
};

const sampleKeyMap = {
    'church-girl': 'churchGirl',
    'gender-price': 'genderPrice',
    'love-story': 'loveStory',
    lightman: 'lightman'
};

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#portfolio-grid .card');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.modal-close');

    const closeMenu = () => {
        nav?.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.setAttribute('aria-label', 'Open menu');
    };

    toggle?.addEventListener('click', () => {
        const isOpen = nav?.classList.toggle('open');
        document.body.classList.toggle('menu-open', Boolean(isOpen));
        toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    filterBtns.forEach((btn) => btn.addEventListener('click', () => {
        filterBtns.forEach((button) => button.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        cards.forEach((card) => {
            card.hidden = !(filter === 'all' || card.dataset.category === filter);
        });
    }));

    const closeSampleModal = () => {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('[data-sample]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const sample = portfolioSamples[sampleKeyMap[btn.dataset.sample]];
            if (!sample || !modal || !modalBody) return;

            modalBody.innerHTML = `
                <p class="sample-category">${sample.category}</p>
                <h3 id="modalTitle">${sample.title}</h3>
                <div class="sample-text">${sample.sample
                    .split('\n\n')
                    .map((paragraph) => `<p>${paragraph}</p>`)
                    .join('')}</div>
                <p class="sample-note">Short portfolio excerpt. Full work available on request.</p>
                <a class="btn btn-primary sample-cta" href="#contact">Request Similar Work</a>
            `;
            modal.setAttribute('aria-hidden', 'false');
            closeModal?.focus();
        });
    });

    closeModal?.addEventListener('click', closeSampleModal);
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) closeSampleModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        closeMenu();
        closeSampleModal();
    });
});
