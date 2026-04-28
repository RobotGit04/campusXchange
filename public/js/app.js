const appContent = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-link');

// Navigation links map to routes
const routes = {
    '': renderDashboard,
    '#dashboard': renderDashboard,
    '#browse': renderBrowse,
    '#post': renderPost,
    '#chat': renderChat,
    '#emergency': renderEmergency,
    '#profile': renderProfile,
    '#admin': renderAdmin,
    '#listing': renderListing
};

// Original dashboard content stored here to restore it
let originalDashboardContent = '';

function initApp() {
    originalDashboardContent = appContent.innerHTML;
    
    // Add event listeners to nav
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if(href.startsWith('#')) {
                // Let hashchange handle it
            } else {
                e.preventDefault();
                const hash = href === '#' ? '#dashboard' : href;
                window.location.hash = hash;
            }
        });
    });

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Initial load
}

function handleRoute() {
    let hash = window.location.hash;
    if (!routes[hash]) hash = '#dashboard';

    // Update active state in sidebar
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash || (hash === '#dashboard' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
    });

    // Render view
    routes[hash]();
    lucide.createIcons();
    
    // Re-attach listeners for dynamically rendered content like save buttons
    attachSaveListeners();
}

function renderDashboard() {
    appContent.innerHTML = originalDashboardContent;
}

function renderBrowse() {
    appContent.innerHTML = `
        <div class="dashboard-view">
            <div class="section-header" style="margin-bottom: 16px;">
                <h2>Browse Marketplace</h2>
            </div>
            
            <!-- Filters -->
            <div style="display: flex; gap: 16px; margin-bottom: 32px; overflow-x: auto; padding-bottom: 8px;">
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-300); background: var(--gray-900); color: white; cursor: pointer; font-weight: 600;">All Items</button>
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: white; cursor: pointer; font-weight: 500;">Textbooks</button>
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: white; cursor: pointer; font-weight: 500;">Electronics</button>
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: white; cursor: pointer; font-weight: 500;">Hostel Furniture</button>
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: white; cursor: pointer; font-weight: 500;">Lab Essentials</button>
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: white; cursor: pointer; font-weight: 500; display:flex; align-items:center; gap:6px;"><i data-lucide="shield-check" size="16" style="color:var(--primary-red);"></i> Verified Only</button>
                <button style="padding: 8px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: white; cursor: pointer; font-weight: 500;">Free / Donate</button>
            </div>

            <!-- Grid -->
            <div class="items-grid">
                <!-- We can reuse some cards from dashboard, adding more variety -->
                ${createItemCard('MacBook Air M1 - Silver', 'Electronics', '₹55,000', 'EXCELLENT', 'laptop_product_1777392447151.png')}
                ${createItemCard('Engineering Mechanics Bundle', 'Textbooks', '₹1,200', 'GOOD', 'books_product_1777392577013.png')}
                ${createItemCard('Standard White Lab Coat', 'Essentials', '₹450', 'NEW', 'lab_coat_product_1777392875195.png')}
                ${createItemCard('Compact Wooden Study Desk', 'Furniture', '₹2,800', 'EXCELLENT', 'study_table_product_1777392965322.png')}
                ${createItemCard('Durable Campus Backpack', 'Accessories', '₹1,500', 'LIKE NEW', 'backpack_product_1777393026909.png')}
                ${createItemCard('Scientific Calculator FX-991ES', 'Electronics', '₹800', 'GOOD', 'calculator_product_1777393287192.png')}
                
                <div class="item-card" onclick="window.location.hash='#listing'">
                    <div class="badge condition">GOOD</div>
                    <button class="save-btn"><i data-lucide="heart" size="18"></i></button>
                    <div class="item-image"><div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f3f4f6"><i data-lucide="lamp" size="48" color="#9CA3AF"></i></div></div>
                    <div class="item-body">
                        <div class="item-cat">Hostel Items</div>
                        <div class="item-title">Study Lamp (Click to view)</div>
                        <div class="item-price">₹300</div>
                        <div class="item-meta">
                            <div class="user-meta"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"><span class="verified-badge"><i data-lucide="badge-check" size="14"></i></span></div>
                            <span class="dist-label">Hostel F</span>
                        </div>
                    </div>
                </div>
                
                <div class="item-card">
                    <div class="badge active" style="background:#10B981; color:white;">FREE</div>
                    <button class="save-btn"><i data-lucide="heart" size="18"></i></button>
                    <div class="item-image"><div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f3f4f6"><i data-lucide="book" size="48" color="#9CA3AF"></i></div></div>
                    <div class="item-body">
                        <div class="item-cat">Donation</div>
                        <div class="item-title">1st Year Notes (CS Dept)</div>
                        <div class="item-price">₹0</div>
                        <div class="item-meta">
                            <div class="user-meta"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Senior"><span class="verified-badge"><i data-lucide="badge-check" size="14"></i></span></div>
                            <span class="dist-label">Library</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPost() {
    appContent.innerHTML = `
        <div class="dashboard-view" style="max-width: 800px; margin: 0 auto;">
            <div class="section-header">
                <h2>Post an Item</h2>
            </div>
            
            <div style="background: white; padding: 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100);">
                
                <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                    <div style="flex:1; border: 2px dashed var(--gray-300); border-radius: var(--radius-lg); padding: 40px; text-align: center; cursor: pointer; transition: 0.2s;">
                        <i data-lucide="image-plus" size="40" style="color: var(--gray-400); margin-bottom: 12px;"></i>
                        <h4 style="margin-bottom: 4px;">Upload Photos</h4>
                        <p style="font-size: 0.9rem; color: var(--gray-500);">Drag & drop or click to browse</p>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;">Title</label>
                    <input type="text" placeholder="e.g. Scientific Calculator Casio FX-991ES" style="width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-size: 1rem; font-family: inherit;">
                    <div style="font-size: 0.8rem; color: var(--gray-500); margin-top: 6px; display:flex; align-items:center; gap:4px;">
                        <i data-lucide="sparkles" size="12" style="color:#8B5CF6;"></i> AI suggests: Include brand and model for faster sales.
                    </div>
                </div>

                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div style="flex: 1;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px;">Category</label>
                        <select style="width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-size: 1rem; font-family: inherit; background: white;">
                            <option>Electronics</option>
                            <option>Textbooks</option>
                            <option>Furniture</option>
                            <option>Lab Equipment</option>
                            <option>Cycles/Transport</option>
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px;">Condition</label>
                        <select style="width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-size: 1rem; font-family: inherit; background: white;">
                            <option>New / Unused</option>
                            <option>Like New</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div style="flex: 1;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px;">Price (₹)</label>
                        <input type="number" placeholder="Enter amount" style="width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-size: 1rem; font-family: inherit;">
                    </div>
                    <div style="flex: 1; display: flex; align-items: flex-end;">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding-bottom: 12px;">
                            <input type="checkbox" style="width: 18px; height: 18px;">
                            <span style="font-weight: 500;">Also available for Rent</span>
                        </label>
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;">Description</label>
                    <textarea rows="4" placeholder="Describe the item, reason for selling, and any defects..." style="width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-size: 1rem; font-family: inherit; resize: vertical;"></textarea>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 12px;">
                    <button style="padding: 12px 24px; border-radius: var(--radius-md); border: 1px solid var(--gray-200); background: white; font-weight: 600; cursor: pointer;">Cancel</button>
                    <button style="padding: 12px 24px; border-radius: var(--radius-md); border: none; background: var(--primary-red); color: white; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(229, 9, 20, 0.2);">Post Item</button>
                </div>
            </div>
        </div>
    `;
}

function renderChat() {
    appContent.innerHTML = `
        <div class="dashboard-view" style="display: flex; height: calc(100vh - 80px); padding: 24px; gap: 24px;">
            <!-- Chat List -->
            <div style="width: 320px; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100); display: flex; flex-direction: column; overflow: hidden;">
                <div style="padding: 20px; border-bottom: 1px solid var(--gray-100);">
                    <h3 style="font-weight: 700; margin-bottom: 12px;">Messages</h3>
                    <input type="text" placeholder="Search chats..." style="width: 100%; padding: 10px 16px; border-radius: 20px; border: 1px solid var(--gray-200); background: var(--gray-50); outline: none;">
                </div>
                <div style="flex: 1; overflow-y: auto;">
                    ${createChatListItem('Rohit Sharma', 'Is the laptop still available?', '10m ago', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit')}
                    ${createChatListItem('Priya Patel', 'I can do ₹1000 for the books.', '2h ago', false, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya')}
                    ${createChatListItem('Amit Kumar', 'Perfect, see you at Hostel B.', 'Yesterday', false, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit')}
                </div>
            </div>

            <!-- Chat Window -->
            <div style="flex: 1; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100); display: flex; flex-direction: column; overflow: hidden;">
                <div style="padding: 20px; border-bottom: 1px solid var(--gray-100); display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" style="width: 48px; height: 48px; border-radius: 50%;">
                        <div>
                            <h4 style="font-weight: 700; display:flex; align-items:center; gap:4px;">Rohit Sharma <i data-lucide="badge-check" size="16" style="color:#3B82F6;"></i></h4>
                            <span style="font-size: 0.85rem; color: var(--gray-500);">Computer Science • 3rd Year</span>
                        </div>
                    </div>
                    <div style="display:flex; gap:12px;">
                        <button style="padding: 8px 16px; border-radius: var(--radius-md); background: #FEF2F2; color: var(--primary-red); border: none; font-weight: 600; cursor: pointer;">Report</button>
                        <button style="padding: 8px 16px; border-radius: var(--radius-md); background: var(--primary-black); color: white; border: none; font-weight: 600; cursor: pointer;">View Profile</button>
                    </div>
                </div>

                <!-- Deal Card -->
                <div style="background: var(--gray-50); padding: 16px; border-bottom: 1px solid var(--gray-100); display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 40px; height: 40px; background: var(--gray-200); border-radius: 8px; display:flex; align-items:center; justify-content:center;"><i data-lucide="laptop"></i></div>
                        <div>
                            <div style="font-weight: 600;">MacBook Air M1</div>
                            <div style="color: var(--primary-red); font-weight: 700; font-size: 0.9rem;">₹55,000</div>
                        </div>
                    </div>
                    <button style="padding: 8px 16px; background: #10B981; color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor:pointer;">Accept Offer: ₹53,000</button>
                </div>

                <!-- Messages Area -->
                <div style="flex: 1; padding: 24px; overflow-y: auto; background: #fafafa; display: flex; flex-direction: column; gap: 16px;">
                    <div style="align-self: center; background: var(--gray-200); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: var(--gray-600);">Today</div>
                    
                    <div style="align-self: flex-start; max-width: 70%; display:flex; gap:12px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" style="width: 32px; height: 32px; border-radius: 50%;">
                        <div style="background: white; padding: 12px 16px; border-radius: 0 16px 16px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid var(--gray-100);">
                            Hi! Is the laptop still available? I can pick it up today.
                        </div>
                    </div>
                    
                    <div style="align-self: flex-end; max-width: 70%; display:flex; flex-direction:row-reverse; gap:12px;">
                        <div style="background: var(--primary-red); color: white; padding: 12px 16px; border-radius: 16px 0 16px 16px; box-shadow: 0 1px 2px rgba(229,9,20,0.1);">
                            Yes, it's available. I'm currently near the main library.
                        </div>
                    </div>
                    
                    <div style="align-self: flex-start; max-width: 70%; display:flex; gap:12px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" style="width: 32px; height: 32px; border-radius: 50%;">
                        <div style="background: white; padding: 12px 16px; border-radius: 0 16px 16px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid var(--gray-100);">
                            Great! Would you take ₹53,000 for it? I can pay via UPI right now.
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div style="padding: 20px; border-top: 1px solid var(--gray-100); background: white;">
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <button class="icon-btn" style="background: var(--gray-100); width: 44px; height: 44px; border-radius: 50%;"><i data-lucide="paperclip"></i></button>
                        <button class="icon-btn" style="background: var(--gray-100); width: 44px; height: 44px; border-radius: 50%;"><i data-lucide="map-pin"></i></button>
                        <input type="text" placeholder="Type a message..." style="flex: 1; padding: 14px 20px; border-radius: 30px; border: 1px solid var(--gray-200); outline: none; font-size: 1rem;">
                        <button style="background: var(--primary-red); color: white; width: 44px; height: 44px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(229,9,20,0.2);"><i data-lucide="send" size="20"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderEmergency() {
    appContent.innerHTML = `
        <div class="dashboard-view">
            <div class="section-header" style="margin-bottom: 16px;">
                <h2 style="display:flex; align-items:center; gap:12px;"><i data-lucide="alert-triangle" color="#E50914"></i> Emergency Needs Board</h2>
                <button style="padding: 10px 20px; background: var(--primary-red); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer;">Post Urgent Request</button>
            </div>
            
            <p style="color: var(--gray-500); margin-bottom: 32px;">Real-time board for urgent campus needs. Helping hands are just a few blocks away.</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                <!-- Urgent Card 1 -->
                <div style="background: #FEF2F2; border: 1px solid #FCA5A5; padding: 24px; border-radius: var(--radius-xl); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--primary-red);"></div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Neha" style="width: 40px; height: 40px; border-radius: 50%;">
                            <div>
                                <div style="font-weight: 700;">Neha Gupta</div>
                                <div style="font-size: 0.8rem; color: var(--gray-500);">Posted 5 mins ago • Hostel G</div>
                            </div>
                        </div>
                        <span style="background: var(--primary-red); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; height: fit-content;">URGENT</span>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">Need Scientific Calculator for Exam!</h3>
                    <p style="color: var(--gray-700); margin-bottom: 20px;">My calculator just broke and I have my End-Sem exam in 1 hour. Can anyone near Hostel G lend me one? Will return it by 5 PM.</p>
                    <div style="display: flex; gap: 12px;">
                        <button style="flex: 1; padding: 12px; background: var(--primary-black); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer;">I can help</button>
                        <button style="padding: 12px; background: white; color: var(--primary-black); border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-weight: 600; cursor: pointer; display:flex; align-items:center; justify-content:center;"><i data-lucide="share-2" size="20"></i></button>
                    </div>
                </div>

                <!-- Urgent Card 2 -->
                <div style="background: white; border: 1px solid var(--gray-200); padding: 24px; border-radius: var(--radius-xl); position: relative; overflow: hidden; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" style="width: 40px; height: 40px; border-radius: 50%;">
                            <div>
                                <div style="font-weight: 700;">Raj Malhotra</div>
                                <div style="font-size: 0.8rem; color: var(--gray-500);">Posted 30 mins ago • Mech Dept</div>
                            </div>
                        </div>
                        <span style="background: #F59E0B; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; height: fit-content;">NEED ASAP</span>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">MacBook Type-C Charger Needed</h3>
                    <p style="color: var(--gray-700); margin-bottom: 20px;">Working on my final year project and my battery is at 5%. Anyone in the Mech building have a Type-C charger I can use for an hour?</p>
                    <div style="display: flex; gap: 12px;">
                        <button style="flex: 1; padding: 12px; background: var(--primary-black); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer;">I can help</button>
                        <button style="padding: 12px; background: white; color: var(--primary-black); border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-weight: 600; cursor: pointer; display:flex; align-items:center; justify-content:center;"><i data-lucide="share-2" size="20"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProfile() {
    appContent.innerHTML = `
        <div class="dashboard-view" style="max-width: 900px; margin: 0 auto;">
            
            <!-- Profile Header -->
            <div style="background: white; border-radius: var(--radius-xl); padding: 40px; border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm); margin-bottom: 32px; position: relative;">
                <div style="position: absolute; top: 24px; right: 24px;">
                    <button style="padding: 8px 16px; border: 1px solid var(--gray-200); background: white; border-radius: 20px; font-weight: 600; display:flex; align-items:center; gap:8px; cursor:pointer;"><i data-lucide="edit-2" size="16"></i> Edit Profile</button>
                </div>
                
                <div style="display: flex; gap: 32px; align-items: center;">
                    <div style="width: 120px; height: 120px; border-radius: 50%; background: var(--gray-200); padding: 4px; border: 2px solid var(--primary-red);">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style="width: 100%; height: 100%; border-radius: 50%; background: white;">
                    </div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 800; display:flex; align-items:center; gap:8px;">Aryan Sharma <i data-lucide="badge-check" size="28" style="color:#3B82F6;"></i></h1>
                        <p style="color: var(--gray-500); font-size: 1.1rem; margin-bottom: 12px;">aryan.sharma@university.edu • B.Tech Computer Science</p>
                        <div style="display: flex; gap: 16px;">
                            <div style="display: flex; align-items: center; gap: 6px; background: #FEF2F2; color: var(--primary-red); padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">
                                <i data-lucide="star" size="16" fill="currentColor"></i> 4.9 Rating (42 Reviews)
                            </div>
                            <div style="display: flex; align-items: center; gap: 6px; background: #F0FDF4; color: #059669; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">
                                <i data-lucide="check-circle" size="16"></i> 28 Successful Deals
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div style="display: flex; gap: 32px; border-bottom: 1px solid var(--gray-200); margin-bottom: 32px;">
                <div style="padding-bottom: 12px; font-weight: 600; color: var(--primary-red); border-bottom: 2px solid var(--primary-red); cursor: pointer;">My Listings (12)</div>
                <div style="padding-bottom: 12px; font-weight: 500; color: var(--gray-500); cursor: pointer;">Purchases</div>
                <div style="padding-bottom: 12px; font-weight: 500; color: var(--gray-500); cursor: pointer;">Reviews</div>
            </div>

            <!-- Grid -->
            <div class="items-grid">
                ${createItemCard('MacBook Air M1 - Silver', 'Electronics', '₹55,000', 'EXCELLENT', 'laptop_product_1777392447151.png')}
                ${createItemCard('Engineering Mechanics Bundle', 'Textbooks', '₹1,200', 'GOOD', 'books_product_1777392577013.png')}
            </div>
        </div>
    `;
}

function renderAdmin() {
    appContent.innerHTML = `
        <div class="dashboard-view">
            <div class="section-header">
                <h2>Admin Control Panel</h2>
                <div style="display: flex; gap: 12px;">
                    <span style="background: #FEF2F2; color: var(--primary-red); padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">12 Pending Reports</span>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Users</div>
                    <div class="stat-value">4,289</div>
                    <div style="color: #10B981; font-size: 0.85rem; font-weight: 600;">+124 this week</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Active Listings</div>
                    <div class="stat-value">1,150</div>
                    <div style="color: #10B981; font-size: 0.85rem; font-weight: 600;">+45 this week</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Transactions</div>
                    <div class="stat-value">₹4.2L</div>
                    <div style="color: var(--gray-500); font-size: 0.85rem;">Estimated value</div>
                </div>
            </div>

            <div style="background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100); overflow: hidden;">
                <div style="padding: 20px; border-bottom: 1px solid var(--gray-100); background: #fafafa;">
                    <h3 style="font-weight: 700;">Flagged Content & Reports</h3>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid var(--gray-200); text-align: left; color: var(--gray-500); font-size: 0.9rem;">
                        <th style="padding: 16px 20px;">Item / User</th>
                        <th style="padding: 16px 20px;">Reason</th>
                        <th style="padding: 16px 20px;">Reporter</th>
                        <th style="padding: 16px 20px;">Actions</th>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--gray-100);">
                        <td style="padding: 16px 20px; font-weight: 600;">iPhone 14 Pro Max (Suspicious Price)</td>
                        <td style="padding: 16px 20px; color: var(--primary-red);">Possible Scam - Too cheap</td>
                        <td style="padding: 16px 20px;">@rahul_m</td>
                        <td style="padding: 16px 20px; display: flex; gap: 8px;">
                            <button style="padding: 6px 12px; background: var(--primary-red); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; font-size: 0.8rem;">Ban User</button>
                            <button style="padding: 6px 12px; background: white; color: var(--primary-black); border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-weight: 600; cursor: pointer; font-size: 0.8rem;">Dismiss</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}

function renderListing() {
    appContent.innerHTML = `
        <div class="dashboard-view" style="max-width: 1000px; margin: 0 auto;">
            <div style="display: flex; gap: 8px; font-size: 0.9rem; color: var(--gray-500); margin-bottom: 24px; cursor: pointer;" onclick="window.history.back()">
                <i data-lucide="arrow-left" size="16"></i> Back to Browse
            </div>

            <div style="display: flex; gap: 40px; background: white; padding: 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100);">
                
                <!-- Image Gallery -->
                <div style="flex: 1;">
                    <div style="width: 100%; aspect-ratio: 4/3; background: #f3f4f6; border-radius: var(--radius-lg); margin-bottom: 16px; overflow: hidden; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="lamp" size="80" color="#9CA3AF"></i>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <div style="width: 80px; height: 80px; background: #f3f4f6; border-radius: var(--radius-md); border: 2px solid var(--primary-red);"></div>
                        <div style="width: 80px; height: 80px; background: #e5e7eb; border-radius: var(--radius-md);"></div>
                    </div>
                </div>

                <!-- Details -->
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <div style="margin-bottom: 24px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div>
                                <span style="background: var(--primary-black); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 12px; display: inline-block;">GOOD CONDITION</span>
                                <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 8px;">Study Lamp with Adjustable Neck</h1>
                                <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary-red);">₹300</div>
                            </div>
                            <button class="save-btn" style="position:static; width:48px; height:48px;"><i data-lucide="heart" size="24"></i></button>
                        </div>
                    </div>

                    <div style="background: var(--gray-50); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div style="display: flex; gap: 12px; align-items: center;">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" style="width: 48px; height: 48px; border-radius: 50%;">
                                <div>
                                    <div style="font-weight: 700; font-size: 1.1rem;">Samarth Jain <i data-lucide="badge-check" size="16" style="color:#3B82F6;"></i></div>
                                    <div style="font-size: 0.85rem; color: var(--gray-500);">Hostel F • 2nd Year</div>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; color: #F59E0B; font-weight: 700;">
                                    <i data-lucide="star" size="16" fill="currentColor"></i> 4.8
                                </div>
                                <div style="font-size: 0.8rem; color: var(--gray-500);">12 deals</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <button style="flex: 1; padding: 14px; background: var(--primary-black); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; font-size: 1.05rem;" onclick="window.location.hash='#chat'">Chat with Seller</button>
                            <button style="padding: 14px; background: white; color: var(--primary-black); border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-weight: 600; cursor: pointer; display:flex; align-items:center; justify-content:center;"><i data-lucide="shield-alert" size="20"></i></button>
                        </div>
                    </div>

                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">Description</h3>
                        <p style="color: var(--gray-600); line-height: 1.6;">Selling my Wipro study lamp. Works perfectly, includes a warm white LED bulb. I am upgrading to a monitor light bar so I don't need this anymore. Perfect for late-night studying!</p>
                        
                        <div style="margin-top: 24px; border-top: 1px solid var(--gray-100); padding-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <div style="font-size: 0.8rem; color: var(--gray-500); font-weight: 600; text-transform: uppercase;">Category</div>
                                <div style="font-weight: 500;">Hostel Items</div>
                            </div>
                            <div>
                                <div style="font-size: 0.8rem; color: var(--gray-500); font-weight: 600; text-transform: uppercase;">Posted</div>
                                <div style="font-weight: 500;">2 days ago</div>
                            </div>
                            <div>
                                <div style="font-size: 0.8rem; color: var(--gray-500); font-weight: 600; text-transform: uppercase;">Pickup Location</div>
                                <div style="font-weight: 500;">Hostel F Main Gate</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

// Helpers
function createItemCard(title, category, price, condition, imgSrc) {
    return `
        <div class="item-card" onclick="window.location.hash='#listing'">
            <div class="badge condition">${condition}</div>
            <button class="save-btn"><i data-lucide="heart" size="18"></i></button>
            <div class="item-image">
                <img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/400x300?text=${title.replace(/ /g, '+')}'" alt="${title}">
            </div>
            <div class="item-body">
                <div class="item-cat">${category}</div>
                <div class="item-title">${title}</div>
                <div class="item-price">${price}</div>
                <div class="item-meta">
                    <div class="user-meta">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${title.split(' ')[0]}">
                        <span class="verified-badge"><i data-lucide="badge-check" size="14"></i></span>
                    </div>
                    <span class="dist-label">Nearby</span>
                </div>
            </div>
        </div>
    `;
}

function createChatListItem(name, msg, time, unread, img) {
    const bg = unread ? 'background: #FEF2F2;' : 'background: white;';
    const fw = unread ? 'font-weight: 700;' : 'font-weight: 500;';
    const dot = unread ? '<div style="width: 8px; height: 8px; background: var(--primary-red); border-radius: 50%;"></div>' : '';
    
    return `
        <div style="display: flex; padding: 16px 20px; border-bottom: 1px solid var(--gray-100); cursor: pointer; transition: 0.2s; ${bg} align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 12px; align-items: center; overflow: hidden;">
                <img src="${img}" style="width: 40px; height: 40px; border-radius: 50%;">
                <div style="overflow: hidden;">
                    <div style="font-weight: 700; font-size: 0.95rem; display:flex; align-items:center; gap:4px;">${name}</div>
                    <div style="font-size: 0.85rem; color: var(--gray-500); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ${fw}">${msg}</div>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; min-width: 50px;">
                <span style="font-size: 0.75rem; color: var(--gray-400);">${time}</span>
                ${dot}
            </div>
        </div>
    `;
}

function attachSaveListeners() {
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                btn.style.color = 'inherit';
                icon.setAttribute('fill', 'none');
            } else {
                btn.classList.add('active');
                btn.style.color = '#E50914';
                icon.setAttribute('fill', '#E50914');
            }
            lucide.createIcons();
        });
    });
}

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
