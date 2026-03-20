// RIFTWARDENS: VERIS — Website Script

(function () {
    'use strict';

    // --- Nav scroll effect ---
    var nav = document.getElementById('nav');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var scrollY = window.pageYOffset;
        if (scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // --- Mobile nav toggle ---
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        var links = navLinks.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                toggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        }
    }

    // --- Scroll-triggered fade-in animations ---
    var fadeTargets = [
        '.stat-card', '.loop-step', '.feature-card',
        '.class-card', '.titan-card', '.timeline-entry',
        '.pillar', '.media-hero'
    ];

    // Add fade-in class to all targets
    fadeTargets.forEach(function (selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el) {
            el.classList.add('fade-in');
        });
    });

    // Intersection Observer for fade-ins
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        document.querySelectorAll('.fade-in').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior) ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var navHeight = nav.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();
