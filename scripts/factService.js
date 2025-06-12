class FactService {
    static async getCatFact() {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.fact;
        } catch (error) {
            console.error('Error fetching cat fact:', error);
            throw error;
        }
    }
    
    static async getJoke() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.message);
            }
            
            return data.joke;
        } catch (error) {
            console.error('Error fetching joke:', error);
            throw error;
        }
    }
}