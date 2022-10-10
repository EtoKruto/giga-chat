// const { createClient } = supabase;
// const supabase = SupabaseClient.createClient(
//   'https://cefxrlgloxjkanlcrmas.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZnhybGdsb3hqa2FubGNybWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUzNzA2OTAsImV4cCI6MTk4MDk0NjY5MH0.l9OuqVz-39QJEYqauSmTwJU6VyMYnpu_9RLKuYPDwvM'
// );
const { createClient } = supabase;
const _supabase = createClient(
  'https://cefxrlgloxjkanlcrmas.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZnhybGdsb3hqa2FubGNybWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUzNzA2OTAsImV4cCI6MTk4MDk0NjY5MH0.l9OuqVz-39QJEYqauSmTwJU6VyMYnpu_9RLKuYPDwvM'
);
// console.log('Supabase Instance: ', _supabase);

const messagesElement = document.querySelector('#messages');

function addMessageToPage(message) {
  const element = document.createElement('li');
  element.classList.add('card', 'mb-2');
  element.innerHTML = `
          <div class="card-body">
              <div class="d-flex flex-row">
                <div class="column-sm-2 avatar-container">
                  <img
                    class="user-image mr-3"
                    src="https://media.tenor.com/jFn8sS1Et-0AAAAM/cat.gif"
                    alt="Generic placeholder image"
                  />
                  <p class="avatar-username">${message.username}</p>
                </div>
                <div class="column-sm-10">
                  <p>
                  ${message.content}
                  </p>
                </div>
              </div>
              <div class="d-flex flex-row">
                <p class="col-sm-12 col-timestamp">${message.created_at}</p>
              </div>
            </div>

`;
  messagesElement.append(element);
  setTimeout(() => {
    element.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

const form = document.querySelector('form');
const contentElement = document.querySelector('#content');

async function init() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    // console.log('formData', formData);
    const date = new Date();

    const messageObj = {
      username: formData.get('username'),
      content: formData.get('content'),
      // timestamp: date.toLocaleString('en-US')
    };
    console.log('messageObj', messageObj);
    contentElement.value = '';
    _supabase
      .from('messages')
      .insert([messageObj])
      .then(() => {
        console.log('message sent');
      })
      .catch((error) => {
        console.log('error', error);
      });
  });

  let { data: messages } = await _supabase.from('messages').select('*');

  messages.forEach(addMessageToPage);

  const mySubscription = _supabase
    .from('messages')
    .on('INSERT', (message) => {
      console.log('Message received!', message);
      addMessageToPage(message.new);
    })
    .subscribe();
}

init();

// console.log('test3');
