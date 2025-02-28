// src/utils/helpers.js

/**
 * Generates a random color based on a string (like user ID)
 * @param {string} str - String to generate color from
 * @returns {string} - CSS color string
 */
export const generateRandomColor = (str) => {
    // Generate a hash from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a hue value (0-360) from the hash
    const h = Math.abs(hash % 360);
    
    // Use a fixed saturation and lightness for visibility
    const s = 65;
    const l = 65;
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  };
  
  /**
   * Generates a random room ID
   * @returns {string} - Random room ID
   */
  export const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10);
  };
  
  /**
   * Formats a timestamp into a readable time
   * @param {number|Date} timestamp - Timestamp to format
   * @returns {string} - Formatted time string (e.g., "3:45 PM")
   */
  export const formatTime = (timestamp) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  /**
   * Creates an object URL from a Blob or File
   * @param {Blob|File} blob - Blob or File to create URL from
   * @returns {string} - Object URL
   */
  export const createObjectURL = (blob) => {
    return URL.createObjectURL(blob);
  };
  
  /**
   * Revokes an object URL
   * @param {string} url - URL to revoke
   */
  export const revokeObjectURL = (url) => {
    URL.revokeObjectURL(url);
  };
  
  /**
   * Debounces a function call
   * @param {Function} func - Function to debounce
   * @param {number} wait - Time to wait in milliseconds
   * @returns {Function} - Debounced function
   */
  export const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };
  
  /**
   * Throttles a function call
   * @param {Function} func - Function to throttle
   * @param {number} limit - Throttle time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  /**
   * Checks if an email is valid
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Gets the initials from a name
   * @param {string} name - Full name
   * @returns {string} - Initials (up to 2 characters)
   */
  export const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  /**
   * Copies text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise} - Promise that resolves when text is copied
   */
  export const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
      }
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
        document.body.removeChild(textArea);
        return false;
      }
    }
  };
  
  /**
   * Normalizes mouse or touch event to get coordinates
   * @param {Event} event - Mouse or touch event
   * @returns {Object} - Object with x and y coordinates
   */
  export const getEventCoordinates = (event) => {
    if (event.touches && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
  };

  