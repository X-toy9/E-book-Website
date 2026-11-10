 // E-Book Database Sample Data
        const booksData = [
            {
                id: 1,
                title: "The Silicon Architect",
                author: "Marcus Vance",
                category: "Technology",
                price: 18.99,
                rating: 4.9,
                reviewsCount: 342,
                badge: "Bestseller",
                cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
                pages: 412,
                publishDate: "January 2025",
                language: "English",
                synopsis: "An insider's journey into how artificial intelligence hardware is revolutionizing modern computing infrastructure. Discover the future of high-density neural networks.",
                toc: ["1. The Transistor Fallacy", "2. Neural Interconnects", "3. Quantum Silicon Synthesis", "4. Beyond 2nm Nodes"],
                sampleExcerpt: "The silence inside the cleanroom was absolute, interrupted only by the rhythmic laminar air scrubbers. Inside the silicon wafer, billions of microscopic gates stood ready to emulate human memory..."
            },
            {
                id: 2,
                title: "Echoes of Orion",
                author: "Lyra Thorne",
                category: "Sci-Fi",
                price: 14.50,
                rating: 4.8,
                reviewsCount: 189,
                badge: "New",
                cover: "https://images.unsplash.com/photo-1532012164546-f43249488629?auto=format&fit=crop&q=80&w=800",
                pages: 360,
                publishDate: "February 2025",
                language: "English",
                synopsis: "When deep space telemetry detects an echoing frequency near the Orion Belt, pilot Captain Solis uncovers an ancient galactic mystery.",
                toc: ["1. The Signal from Sector 7", "2. Jump Space Drift", "3. Ruins of Aethelgard", "4. First Contact"],
                sampleExcerpt: "The beacon pulse blinked red against the dark cockpit monitor. It wasn't a standard distress pulse—it had a harmonic frequency unheard in two centuries."
            },
            {
                id: 3,
                title: "Mastering Modern System Design",
                author: "Dr. Kaelen Hayes",
                category: "Technology",
                price: 29.99,
                rating: 5.0,
                reviewsCount: 520,
                badge: "Bestseller",
                cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
                pages: 580,
                publishDate: "November 2024",
                language: "English",
                synopsis: "Comprehensive architectural patterns for distributed microservices, fault-tolerant data storage, and global scale web applications.",
                toc: ["1. Load Balancing Strategies", "2. Distributed Caching", "3. Event-Driven Messaging", "4. Consensus Protocols"],
                sampleExcerpt: "Designing systems for 99.999% uptime requires assuming that every single server, disk, and network link will eventually fail at the worst possible instant."
            },
            {
                id: 4,
                title: "The Zero to One Founder",
                author: "Elena Rostova",
                category: "Business",
                price: 16.99,
                rating: 4.7,
                reviewsCount: 215,
                badge: "Sale",
                cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
                pages: 290,
                publishDate: "October 2024",
                language: "English",
                synopsis: "Practical blueprints for turning high-potential software concepts into multi-million dollar tech enterprises with lean capital.",
                toc: ["1. Finding Product-Market Fit", "2. Lean Fundraising Tactics", "3. Building High-Velocity Teams"],
                sampleExcerpt: "Most startups fail not because they couldn't build their product, but because they built something nobody actually wanted or was willing to pay for."
            },
            {
                id: 5,
                title: "Shadows in the Mist",
                author: "Julian Sterling",
                category: "Fiction",
                price: 12.99,
                rating: 4.6,
                reviewsCount: 140,
                badge: "Popular",
                cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
                pages: 320,
                publishDate: "August 2024",
                language: "English",
                synopsis: "A gripping Victorian noir mystery involving a stolen clockwork relic and an enigmatic investigator in fog-drenched London.",
                toc: ["1. The Thames Fog", "2. A Sealed Envelope", "3. The Clockmaker's Secret"],
                sampleExcerpt: "The streetlamps flickered faintly along the cobblestone alley. Through the dense fog came the rhythmic click-clack of heavy boots..."
            },
            {
                id: 6,
                title: "Quantum Algorithms in Practice",
                author: "Dr. Nathaniel Cross",
                category: "Technology",
                price: 34.00,
                rating: 4.9,
                reviewsCount: 95,
                badge: "New",
                cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
                pages: 440,
                publishDate: "January 2025",
                language: "English",
                synopsis: "Hands-on guide to implementing Qiskit and quantum circuits for cryptographic breaking and optimization problems.",
                toc: ["1. Qubit Mechanics", "2. Superposition Gate Setup", "3. Shor's Algorithm Applied"],
                sampleExcerpt: "Unlike classical bits bound to binary ones or zeros, qubits harness quantum superposition to evaluate massive compute pathways simultaneously."
            }
        ];

        // State Management
        let cart = [];
        let currentCategoryFilter = "All";
        let currentUser = null;
        let userPurchasedBookIds = [1, 3]; // Default sample purchased books for demonstration

        // Initialize App
        window.addEventListener('DOMContentLoaded', () => {
            renderStoreGrid();
            updateCartUI();
            renderProfileLibrary();
        });

        // Navigation Page Switcher Function
        function navigateTo(pageId) {
            document.querySelectorAll('.page-view').forEach(view => {
                view.classList.add('hidden');
            });
            const selectedPage = document.getElementById(`page-${pageId}`);
            if(selectedPage) {
                selectedPage.classList.remove('hidden');
            }

            // Update Nav Buttons Active Style
            document.querySelectorAll('.nav-link').forEach(link => {
                if(link.getAttribute('data-page') === pageId) {
                    link.classList.add('text-brand-400', 'font-bold');
                    link.classList.remove('text-slate-300');
                } else {
                    link.classList.remove('text-brand-400', 'font-bold');
                    link.classList.add('text-slate-300');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Toggle Mobile Menu
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Render Store Grid
        function renderStoreGrid() {
            const grid = document.getElementById('books-grid');
            const searchVal = document.getElementById('store-search-input')?.value.toLowerCase() || "";
            const sortVal = document.getElementById('sort-select')?.value || "featured";

            let filtered = booksData.filter(book => {
                const matchesCat = currentCategoryFilter === "All" || book.category === currentCategoryFilter;
                const matchesSearch = book.title.toLowerCase().includes(searchVal) || book.author.toLowerCase().includes(searchVal);
                return matchesCat && matchesSearch;
            });

            // Apply Sorting
            if (sortVal === "price-low") filtered.sort((a,b) => a.price - b.price);
            else if (sortVal === "price-high") filtered.sort((a,b) => b.price - a.price);
            else if (sortVal === "rating") filtered.sort((a,b) => b.rating - a.rating);

            const noResults = document.getElementById('no-results-state');
            if (filtered.length === 0) {
                grid.innerHTML = "";
                noResults.classList.remove('hidden');
                return;
            } else {
                noResults.classList.add('hidden');
            }

            grid.innerHTML = filtered.map(book => `
                <div class="bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between group">
                    <div class="relative cursor-pointer overflow-hidden aspect-[3/4]" onclick="openBookModal(${book.id})">
                        <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-brand-400 border border-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            ${book.category}
                        </div>
                        ${book.badge ? `<div class="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">${book.badge}</div>` : ''}
                    </div>

                    <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                            <div class="flex items-center space-x-1 text-amber-400 text-xs mb-1">
                                <i class="fas fa-star"></i>
                                <span class="font-bold text-slate-200">${book.rating}</span>
                                <span class="text-slate-500">(${book.reviewsCount})</span>
                            </div>
                            <h3 onclick="openBookModal(${book.id})" class="text-base font-bold text-white hover:text-brand-400 transition-colors cursor-pointer line-clamp-1">${book.title}</h3>
                            <p class="text-xs text-slate-400">by ${book.author}</p>
                        </div>

                        <div class="flex items-center justify-between pt-3 border-t border-slate-800">
                            <span class="text-lg font-extrabold text-white">$${book.price.toFixed(2)}</span>
                            <div class="flex space-x-2">
                                <button onclick="addToCart(${book.id})" class="p-2.5 bg-slate-800 hover:bg-brand-600 text-white rounded-xl transition-colors">
                                    <i class="fas fa-cart-plus text-xs"></i>
                                </button>
                                <button onclick="buyNowDirect(${book.id})" class="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs rounded-xl shadow-md transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Category Filtering
        function setCategoryFilter(category, btnElement) {
            currentCategoryFilter = category;
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-brand-600', 'text-white');
                b.classList.add('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
            });
            if(btnElement) {
                btnElement.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');
                btnElement.classList.add('bg-brand-600', 'text-white');
            }
            renderStoreGrid();
        }

        function filterBooks() {
            renderStoreGrid();
        }

        // Book Detail Modal View
        function openBookModal(bookId) {
            const book = booksData.find(b => b.id === bookId);
            if (!book) return;

            const modalContent = document.getElementById('book-modal-content');
            modalContent.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div class="md:col-span-5">
                        <img src="${book.cover}" alt="${book.title}" class="w-full rounded-2xl shadow-2xl object-cover aspect-[3/4] border border-slate-800">
                    </div>
                    <div class="md:col-span-7 space-y-6">
                        <div>
                            <span class="text-xs font-semibold text-brand-400 uppercase tracking-widest">${book.category}</span>
                            <h2 class="text-3xl font-extrabold text-white mt-1">${book.title}</h2>
                            <p class="text-sm text-slate-400 mt-1">Written by <span class="text-slate-200 font-medium">${book.author}</span></p>
                        </div>

                        <div class="flex items-center space-x-6 text-xs text-slate-400 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                            <div><strong class="text-slate-200 block text-sm">${book.pages}</strong> Pages</div>
                            <div class="border-l border-slate-800 pl-6"><strong class="text-slate-200 block text-sm">${book.publishDate}</strong> Published</div>
                            <div class="border-l border-slate-800 pl-6"><strong class="text-slate-200 block text-sm">${book.language}</strong> Format</div>
                        </div>

                        <div>
                            <h4 class="text-xs font-bold text-slate-300 uppercase mb-2">Synopsis</h4>
                            <p class="text-sm text-slate-300 leading-relaxed font-light">${book.synopsis}</p>
                        </div>

                        <div>
                            <h4 class="text-xs font-bold text-slate-300 uppercase mb-2">Table of Contents Preview</h4>
                            <ul class="text-xs text-slate-400 space-y-1 list-disc list-inside">
                                ${book.toc.map(chapter => `<li>${chapter}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                            <h4 class="text-xs font-bold text-brand-400 uppercase"><i class="fas fa-quote-left mr-1"></i> Sample Chapter Excerpt</h4>
                            <p class="text-xs text-slate-400 italic font-serif leading-relaxed">"${book.sampleExcerpt}"</p>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-slate-800">
                            <div>
                                <span class="text-xs text-slate-400 block">Digital E-Book Price</span>
                                <span class="text-3xl font-black text-white">$${book.price.toFixed(2)}</span>
                            </div>
                            <div class="flex space-x-3">
                                <button onclick="addToCart(${book.id})" class="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-all">
                                    <i class="fas fa-cart-plus mr-2"></i> Add to Cart
                                </button>
                                <button onclick="closeBookModal(); buyNowDirect(${book.id});" class="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('modal-book-detail').classList.remove('hidden');
        }

        function closeBookModal() {
            document.getElementById('modal-book-detail').classList.add('hidden');
        }

        // Cart Drawer Operations
        function toggleCartModal(show) {
            const modal = document.getElementById('modal-cart');
            if (show) modal.classList.remove('hidden');
            else modal.classList.add('hidden');
        }

        function addToCart(bookId) {
            const book = booksData.find(b => b.id === bookId);
            if (!book) return;

            const existingIndex = cart.findIndex(item => item.id === bookId);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({ ...book, quantity: 1 });
            }

            updateCartUI();
            showToast(`Added "${book.title}" to cart!`, "success");
        }

        function removeFromCart(bookId) {
            cart = cart.filter(item => item.id !== bookId);
            updateCartUI();
        }

        function updateCartQuantity(bookId, delta) {
            const item = cart.find(i => i.id === bookId);
            if(item) {
                item.quantity += delta;
                if(item.quantity <= 0) {
                    removeFromCart(bookId);
                } else {
                    updateCartUI();
                }
            }
        }

        function updateCartUI() {
            const list = document.getElementById('cart-items-list');
            const totalElement = document.getElementById('cart-total-price');
            const badge = document.getElementById('cart-badge');

            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Badge Update
            badge.innerText = totalCount;
            if(totalCount > 0) {
                badge.classList.remove('scale-0');
            } else {
                badge.classList.add('scale-0');
            }

            // Total price
            totalElement.innerText = `$${totalPrice.toFixed(2)}`;

            // Render list
            if(cart.length === 0) {
                list.innerHTML = `<p class="text-slate-500 text-xs text-center py-8">Your shopping cart is currently empty.</p>`;
                return;
            }

            list.innerHTML = cart.map(item => `
                <div class="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <img src="${item.cover}" class="w-12 h-16 object-cover rounded-md">
                    <div class="flex-1">
                        <h4 class="text-xs font-bold text-white line-clamp-1">${item.title}</h4>
                        <p class="text-[10px] text-slate-400">$${item.price.toFixed(2)}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="updateCartQuantity(${item.id}, -1)" class="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs flex items-center justify-center">-</button>
                            <span class="text-xs font-semibold text-slate-200">${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, 1)" class="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs flex items-center justify-center">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-slate-500 hover:text-red-400 p-2 text-xs">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        // Direct Purchase Shortcut
        function buyNowDirect(bookId) {
            const book = booksData.find(b => b.id === bookId);
            if (!book) return;

            // Clear cart & add single book for direct buy
            cart = [{ ...book, quantity: 1 }];
            updateCartUI();
            openCheckoutModal();
        }

        // Checkout Modal Logic
        function openCheckoutModal() {
            if (cart.length === 0) {
                showToast("Your cart is empty!", "error");
                return;
            }
            toggleCartModal(false);

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);

            document.getElementById('checkout-count').innerText = `${count} book(s)`;
            document.getElementById('checkout-total').innerText = `$${total.toFixed(2)}`;
            document.getElementById('modal-checkout').classList.remove('hidden');
        }

        function closeCheckoutModal() {
            document.getElementById('modal-checkout').classList.add('hidden');
        }

        function selectPaymentMethod(method, btn) {
            document.querySelectorAll('.payment-opt').forEach(b => {
                b.classList.remove('border-brand-500', 'bg-slate-800/80');
                b.classList.add('border-slate-800', 'bg-slate-950');
            });
            btn.classList.remove('border-slate-800', 'bg-slate-950');
            btn.classList.add('border-brand-500', 'bg-slate-800/80');
        }

        function handlePaymentSubmit(event) {
            event.preventDefault();
            const payBtn = document.getElementById('pay-button');
            payBtn.disabled = true;
            payBtn.innerText = "Processing Payment...";

            setTimeout(() => {
                // Add purchased books to user library
                cart.forEach(item => {
                    if (!userPurchasedBookIds.includes(item.id)) {
                        userPurchasedBookIds.push(item.id);
                    }
                });

                cart = [];
                updateCartUI();
                renderProfileLibrary();

                payBtn.disabled = false;
                payBtn.innerText = "Confirm & Pay Now";
                closeCheckoutModal();

                showToast("Payment Successful! E-Books added to your Profile Library.", "success");
                navigateTo('profile');
            }, 1500);
        }

        // Profile Library Rendering
        function renderProfileLibrary() {
            const grid = document.getElementById('profile-library-grid');
            const countLabel = document.getElementById('profile-purchased-count');
            
            const ownedBooks = booksData.filter(b => userPurchasedBookIds.includes(b.id));
            countLabel.innerText = ownedBooks.length;

            if (ownedBooks.length === 0) {
                grid.innerHTML = `<p class="text-slate-500 text-sm">You haven't purchased any e-books yet.</p>`;
                return;
            }

            grid.innerHTML = ownedBooks.map(book => `
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex space-x-4 items-center">
                    <img src="${book.cover}" class="w-16 h-22 object-cover rounded-xl border border-slate-700">
                    <div class="flex-1 space-y-1">
                        <h4 class="text-sm font-bold text-white line-clamp-1">${book.title}</h4>
                        <p class="text-xs text-slate-400">Format: EPUB, PDF</p>
                        <div class="pt-2 flex space-x-2">
                            <button onclick="downloadBook('${book.title}')" class="px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-[11px] font-bold rounded-lg transition-colors flex items-center">
                                <i class="fas fa-download mr-1.5"></i> EPUB
                            </button>
                            <button onclick="downloadBook('${book.title}')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg transition-colors flex items-center">
                                <i class="fas fa-file-pdf mr-1.5"></i> PDF
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function downloadBook(title) {
            showToast(`Downloading "${title}" file...`, "success");
        }

        // Authentication Modal Logic
        function openAuthModal(tab) {
            switchAuthTab(tab);
            document.getElementById('modal-auth').classList.remove('hidden');
        }

        function closeAuthModal() {
            document.getElementById('modal-auth').classList.add('hidden');
        }

        function switchAuthTab(tab) {
            const loginBtn = document.getElementById('tab-login-btn');
            const regBtn = document.getElementById('tab-register-btn');
            const loginForm = document.getElementById('form-login');
            const regForm = document.getElementById('form-register');

            if(tab === 'login') {
                loginBtn.classList.add('border-brand-500', 'text-white');
                loginBtn.classList.remove('border-transparent', 'text-slate-400');
                regBtn.classList.remove('border-brand-500', 'text-white');
                regBtn.classList.add('border-transparent', 'text-slate-400');
                loginForm.classList.remove('hidden');
                regForm.classList.add('hidden');
            } else {
                regBtn.classList.add('border-brand-500', 'text-white');
                regBtn.classList.remove('border-transparent', 'text-slate-400');
                loginBtn.classList.remove('border-brand-500', 'text-white');
                loginBtn.classList.add('border-transparent', 'text-slate-400');
                regForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            }
        }

        function handleAuthSubmit(event, type) {
            event.preventDefault();
            currentUser = {
                name: type === 'login' ? 'Elena Rostova' : 'New Registered Reader',
                email: 'reader@lumina.com'
            };

            // Update Auth Header UI
            const authContainer = document.getElementById('auth-nav-container');
            authContainer.innerHTML = `
                <button onclick="navigateTo('profile')" class="flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-xl transition-all">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" class="w-6 h-6 rounded-full object-cover">
                    <span class="text-xs font-semibold text-slate-200">My Library</span>
                </button>
            `;

            closeAuthModal();
            showToast(type === 'login' ? "Welcome back to Lumina!" : "Account created successfully!", "success");
        }

        // Contact Form Submission Handler
        function handleContactSubmit(event) {
            event.preventDefault();
            showToast("Thank you! Your message has been sent to our support team.", "success");
            event.target.reset();
        }

        // Toast Notification System
        function showToast(message, type = "success") {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            const toastIcon = document.getElementById('toast-icon');

            toastMsg.innerText = message;
            if(type === 'error') {
                toastIcon.innerHTML = `<i class="fas fa-exclamation-circle text-red-400"></i>`;
            } else {
                toastIcon.innerHTML = `<i class="fas fa-check-circle text-emerald-400"></i>`;
            }

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }