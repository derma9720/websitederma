/**
 * DERMA LUXURY SCRIPT
 * Mengatur Review Otomatis & Integrasi WhatsApp
 */

// 1. KONFIGURASI NOMOR WA
const whatsappNumber = "6285275284400"; // Pastikan formatnya angka saja mulai dengan 62
let selectedProduct = "";

// 2. DATA REVIEW (Tampil Otomatis Tanpa Database)
const reviews = [
    { 
        name: "Siska Amelia", 
        rating: 5, 
        text: "Bahannya adem banget, warna lilacnya benar-benar premium! Beda sama kemeja biasa.",
        date: "2 hari yang lalu"
    },
    { 
        name: "Andi Pratama", 
        rating: 5, 
        text: "Kemeja salurnya pas banget di badan. Jahitan sangat rapi, pengiriman ke Jakarta cuma sehari.",
        date: "5 hari yang lalu"
    },
    { 
        name: "Winda", 
        rating: 4, 
        text: "Warna aslinya lebih cantik dari foto. Packingnya juga mewah sekali, cocok buat kado.",
        date: "1 minggu yang lalu"
    },
    { 
        name: "Budi Santoso", 
        rating: 5, 
        text: "Beli untuk kado istri, dia suka banget. Katanya bahannya adem dan terlihat mahal.",
        date: "2 minggu yang lalu"
    }
];

// 3. JALANKAN SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan Review
    const container = document.getElementById('reviews-container');
    if (container) {
        container.innerHTML = reviews.map(rev => `
            <div class="testi-card">
                <div class="stars">${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}</div>
                <h5>${rev.name}</h5>
                <p>"${rev.text}"</p>
                <div class="testi-footer">
                    <small style="color: #25D366; font-weight: 600;"><i class="fa-solid fa-circle-check"></i> Verified Buyer</small>
                    <span class="testi-date" style="font-size: 0.7rem; color: #bbb; margin-left: 10px;">${rev.date}</span>
                </div>
            </div>
        `).join('');
    }

    // Perbaiki link "Hubungi Kami" di Navbar agar stabil
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.href = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Halo%20DERMA%2C%20saya%20ingin%20tanya-tanya%20koleksinya.`;
        navCta.setAttribute('target', '_blank');
    }
});

// 4. FUNGSI MODAL
function openModal(productName) {
    selectedProduct = productName;
    document.getElementById('modal-product-name').innerText = productName;
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Kunci scroll agar rapi
}

function closeModal() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Aktifkan scroll kembali
}

// 5. FUNGSI KIRIM WHATSAPP (PERBAIKAN ERROR)
function sendWhatsApp() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const size = document.getElementById('size-select').value;
    const payment = document.getElementById('payment-method').value;
    
    // Validasi input
    if (name.trim() === "" || address.trim() === "") {
        alert("Mohon lengkapi Nama dan Alamat pengiriman.");
        return;
    }

    // Format Pesan
    const text = `Halo DERMA Luxury Specialist,\n\n` +
                 `Saya mau pesan:\n` +
                 `*Produk:* ${selectedProduct}\n` +
                 `*Ukuran:* ${size}\n` +
                 `---------------------------\n` +
                 `*Nama:* ${name}\n` +
                 `*Alamat:* ${address}\n` +
                 `*Pembayaran:* ${payment}\n\n` +
                 `Mohon segera diproses, terima kasih!`;

    // Gunakan URL API agar tidak kena error "Site Can't Be Reached"
    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
    
    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');
    
    // Tutup modal
    closeModal();
}

// Tutup modal jika user klik di luar area kotak putih
window.onclick = function(event) {
    const modal = document.getElementById('checkout-modal');
    if (event.target == modal) {
        closeModal();
    }
}
