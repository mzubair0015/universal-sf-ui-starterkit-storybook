/**
 * Pub-Sub Pattern :: Event Class
 */

 class Event {
	constructor() {
		this.topics = {};
	}

	subscribe(topic, listener) {
		// Check whether the topic and listener already exist.
		if (!topic || !listener) {
			return;
		}

		// Create the topic if not yet created.
		if (!this.topics[topic]) {
			this.topics[topic] = [];
		}

		// Add the listener to the Queue.
		this.topics[topic].push(listener);
	}

	publish(topic, data) {
		// Check whether the topic and listener already exist.
		if (!this.topics[topic] || this.topics[topic].length < 1) {
			return;
		}

		// Fire the event to all the listeners
		this.topics[topic].forEach(function(listener) {
		    listener(data || {});
		});
	}
}

const eventQueue = new Event();

export default eventQueue;