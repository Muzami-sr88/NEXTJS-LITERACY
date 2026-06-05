const mongoose    = require('mongoose');
const dotenv      = require('dotenv');
const path        = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const LiteraryTerm        = require('../models/LiteraryTerm');
const WorldLiterature     = require('../models/WorldLiterature');
const CriticalPerspective = require('../models/CriticalPerspective');
const Admin               = require('../models/Admin');

const terms = [
  { title: 'Allusion', slug: 'allusion', excerpt: 'An indirect reference to a person, place, event, or literary work.', category: 'A',
    content: { definition: 'A subtle reference to a person, place, event, or work of art.', simplifiedDef: 'A quick reference to something well-known to add meaning.',
      examples: [{ heading: 'In Literature', body: "Mary Shelley's Frankenstein alludes to the myth of Prometheus." }], relatedTerms: ['Symbol','Metaphor'] }},
  { title: 'Bildungsroman', slug: 'bildungsroman', excerpt: 'A coming-of-age story.', category: 'B',
    content: { definition: 'A novel about moral and psychological growth from youth to adulthood.', simplifiedDef: 'A story about growing up.',
      examples: [{ heading: 'Example', body: "Dickens' Great Expectations is a classic bildungsroman." }], relatedTerms: ['Protagonist'] }},
  { title: 'Dramatic Irony', slug: 'dramatic-irony', excerpt: 'When the audience knows something the character does not.', category: 'D',
    content: { definition: 'Audience has knowledge a character lacks.', simplifiedDef: 'The reader knows more than the character.',
      examples: [{ heading: 'Shakespeare', body: "In Romeo and Juliet the audience knows Juliet is not dead while Romeo does not." }], relatedTerms: ['Irony','Foreshadowing'] }},
  { title: 'Foreshadowing', slug: 'foreshadowing', excerpt: 'A hint about what will happen later.', category: 'F',
    content: { definition: 'Hints or clues early in a narrative suggesting later events.', simplifiedDef: 'Clues dropped early that hint at what comes later.',
      examples: [{ heading: 'Example', body: 'Dark storm clouds often foreshadow conflict.' }], relatedTerms: ['Motif'] }},
  { title: 'Metaphor', slug: 'metaphor', excerpt: 'A direct comparison without "like" or "as".', category: 'M',
    content: { definition: 'Describing something as if it were something else.', simplifiedDef: 'Saying something IS something else.',
      examples: [{ heading: 'Example', body: '"Life is a journey."' }], relatedTerms: ['Simile'] }},
  { title: 'Personification', slug: 'personification', excerpt: 'Giving human qualities to non-human things.', category: 'P',
    content: { definition: 'Human characteristics attributed to abstract ideas or objects.', simplifiedDef: 'Making objects act like people.',
      examples: [{ heading: 'Example', body: '"The wind whispered through the trees."' }], relatedTerms: ['Metaphor'] }},
  { title: 'Simile', slug: 'simile', excerpt: 'A comparison using "like" or "as".', category: 'S',
    content: { definition: 'Comparison using "like" or "as".', simplifiedDef: 'Comparing two things using "like" or "as".',
      examples: [{ heading: 'Example', body: '"She was as brave as a lion."' }], relatedTerms: ['Metaphor'] }},
  { title: 'Unreliable Narrator', slug: 'unreliable-narrator', excerpt: 'A narrator whose credibility is compromised.', category: 'U',
    content: { definition: 'A narrative voice that cannot be fully trusted.', simplifiedDef: "A storyteller you can't fully trust.",
      examples: [{ heading: 'Example', body: "Nick Carraway in The Great Gatsby selectively shares information." }], relatedTerms: ['Point of View'] }},
];

const worldLit = [
  { title: 'One Hundred Years of Solitude', slug: 'one-hundred-years-of-solitude', author: 'Gabriel García Márquez', tag: 'World Lit Guide', region: 'Latin America',
    excerpt: 'A multigenerational saga of the Buendía family in the fictional town of Macondo.',
    content: { introduction: { body: ["García Márquez's 1967 masterpiece defines magical realism.","It traces seven generations of the Buendía family."] },
      plotSummary: { body: ['José Arcadio Buendía founds Macondo.','The family endures civil wars and eventual apocalyptic destruction.'] },
      themes: [{ color:'#e74c3c', title:'Solitude & Isolation', desc:'Characters are condemned to solitude as personal fate and political metaphor.' }],
      quotes: [{ quote:"Tell him that a person doesn't die when he should but when he can.", attribution:'García Márquez', tag:'Theme', theme:'#e74c3c' }],
      characters: [{ name:'José Arcadio Buendía', role:'Patriarch', color:'#07294e', desc:'Visionary founder of Macondo.' }],
      terms: [{ term:'Magical Realism', def:'Magical elements presented as ordinary within a realistic setting.' }],
      symbols: [{ symbol:'Macondo', color:'#2ecc71', desc:'Represents the beauty and tragedy of Latin American history.' }] }},
  { title: 'Crime and Punishment', slug: 'crime-and-punishment', author: 'Fyodor Dostoevsky', tag: 'World Lit Guide', region: 'Russia',
    excerpt: 'A psychological study of a student who murders a pawnbroker and struggles with guilt.',
    content: { introduction: { body: ["Published 1866, Dostoevsky's exploration of morality, guilt, and redemption."] },
      plotSummary: { body: ['Raskolnikov kills a pawnbroker to test his theory about extraordinary men.','Haunted by guilt, he confesses and accepts punishment as redemption.'] },
      themes: [{ color:'#9b59b6', title:'Redemption through Suffering', desc:'Suffering is the path to genuine moral renewal.' }],
      quotes: [{ quote:'Pain and suffering are always inevitable for a large intelligence and a deep heart.', attribution:'Dostoevsky', tag:'Theme', theme:'#9b59b6' }],
      characters: [{ name:'Raskolnikov', role:'Protagonist', color:'#07294e', desc:'Brilliant student whose arrogance leads to murder.' }],
      terms: [{ term:'Psychological Realism', def:"Depicting characters' inner mental states with extraordinary depth." }],
      symbols: [{ symbol:'The Cross', color:'#e74c3c', desc:'Represents acceptance of suffering and the path to redemption.' }] }},
  { title: 'Things Fall Apart', slug: 'things-fall-apart', author: 'Chinua Achebe', tag: 'World Lit Guide', region: 'Africa',
    excerpt: 'The story of Okonkwo and the collision between Igbo society and colonial forces.',
    content: { introduction: { body: ["Achebe's 1958 novel is the foundational text of African literature in English."] },
      plotSummary: { body: ['Okonkwo is a respected warrior in Umuofia.','British missionaries dismantle the Igbo world, leading to his tragic end.'] },
      themes: [{ color:'#e74c3c', title:'Tradition vs. Change', desc:'The destruction of a culture with its own laws, religion, and values.' }],
      quotes: [{ quote:'When the moon is shining the cripple becomes hungry for a walk.', attribution:'Chinua Achebe', tag:'Theme', theme:'#2ecc71' }],
      characters: [{ name:'Okonkwo', role:'Protagonist', color:'#07294e', desc:'Powerful warrior whose fear of weakness destroys him.' }],
      terms: [{ term:'Post-colonial Literature', def:'Writing addressing colonisation and its aftermath.' }],
      symbols: [{ symbol:'The Yam', color:'#f39c12', desc:'Represents masculinity and status within Igbo society.' }] }},
];

const critical = [
  { title: 'Feminist Criticism', slug: 'feminist-criticism', category: 'Criticism',
    excerpt: 'Analyses literature through the lens of gender and power.',
    content: { introduction: { body: ['Feminist criticism examines how texts reflect or challenge gender roles.'] },
      overview: { body: ['Emerging in the 1960s alongside second-wave feminism.'] },
      keyTheorists: [{ name:'Simone de Beauvoir', contribution:'"One is not born, but rather becomes, a woman."' }],
      examples: [{ heading:'Applied to Jane Eyre', body:"Bertha Mason is read as Jane's repressed self." }] }},
  { title: 'Marxist Criticism', slug: 'marxist-criticism', category: 'Theories',
    excerpt: 'Examines literature in relation to class, economics, and ideology.',
    content: { introduction: { body: ['Marxist criticism connects literary content to historical material conditions.'] },
      overview: { body: ['Asks whose stories are told and how literature reinforces or subverts dominant ideologies.'] },
      keyTheorists: [{ name:'Terry Eagleton', contribution:'Marxism and Literary Criticism (1976).' }],
      examples: [{ heading:'Applied to Great Gatsby', body:'The Valley of Ashes represents the suppressed working class.' }] }},
  { title: 'Psychoanalytic Criticism', slug: 'psychoanalytic-criticism', category: 'Theories',
    excerpt: 'Applies Freudian and Lacanian concepts to texts and characters.',
    content: { introduction: { body: ['Reads literature through psychoanalytic theory, exploring unconscious motivations.'] },
      overview: { body: ["Rooted in Freud's concepts of the unconscious, repression, and the Oedipus complex."] },
      keyTheorists: [{ name:'Sigmund Freud', contribution:'Established the unconscious as domain of repressed desires.' }],
      examples: [{ heading:'Applied to Hamlet', body:"Hamlet's delay stems from an Oedipal conflict, per Ernest Jones." }] }},
  { title: 'Post-Structuralism', slug: 'post-structuralism', category: 'Philosophies',
    excerpt: 'Questions fixed meanings — language is unstable, meaning always deferred.',
    content: { introduction: { body: ['Challenges the assumption that texts have stable, recoverable meanings.'] },
      overview: { body: ['Derrida, Foucault, and Barthes dismantled the idea that structure guarantees meaning.'] },
      keyTheorists: [{ name:'Jacques Derrida', contribution:'"There is nothing outside the text."' }, { name:'Roland Barthes', contribution:'"The Death of the Author" (1967).' }],
      examples: [{ heading:'Applied to any text', body:"A deconstructive reading exposes how a text contradicts its own claims." }] }},
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    await LiteraryTerm.deleteMany({});
    await WorldLiterature.deleteMany({});
    await CriticalPerspective.deleteMany({});
    console.log('Cleared old data');

    const [t, w, c] = await Promise.all([
      LiteraryTerm.insertMany(terms),
      WorldLiterature.insertMany(worldLit),
      CriticalPerspective.insertMany(critical),
    ]);

    console.log(`✓ ${t.length} literary terms`);
    console.log(`✓ ${w.length} world literature`);
    console.log(`✓ ${c.length} critical perspectives`);

    const existing = await Admin.findOne({ email: 'admin@literarypalace.com' });
    if (!existing) {
      await Admin.create({ email: 'admin@literarypalace.com', password: 'Admin@123' });
      console.log('✓ Admin created: admin@literarypalace.com / Admin@123');
    } else {
      console.log('  Admin already exists');
    }

    mongoose.connection.close();
    console.log('\nSeed complete! Run: npm run dev');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}
seed();
