const whatsappNumber = "6285275284400"; // GANTI DENGAN NOMOR WA ANDA

function openModal() {
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment-method').value;
    const size = document.getElementById('size-select').value;
    
    const message = `Halo DERMA, saya mau pesan:%0A%0A` +
                    `*Produk:* DERMA Signature Shirt%0A` +
                    `*Ukuran:* ${size}%0A` +
                    `*Harga:* Rp 120.000%0A%0A` +
                    `*Data Pembeli:*%0A` +
                    `Nama: ${name}%0A` +
                    `Alamat: ${address}%0A` +
                    `Metode Bayar: ${payment}%0A%0A` +
                    `Mohon diproses ya, Kak!`;
    
   const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(url, '_blank');
    closeModal();
});