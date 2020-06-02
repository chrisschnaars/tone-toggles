export default function setupAboutModal() {
    // Open About Modal
    document.querySelector('.js-about-open').addEventListener(
        'click',
        function () {
            document.querySelector('.about').classList.toggle('overlay--visible');
        },
        false
    );

    // Close about modal
    document.querySelector('.js-about-close').addEventListener(
        'click',
        function () {
            document.querySelector('.about').classList.toggle('overlay--visible');
        },
        false
    );
}
