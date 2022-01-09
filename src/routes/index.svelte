<script>
    import {FileUploadClient} from '$lib/FileUploadClient.mjs';

    /* The server-side files path */
    const filesPath = '/'; // in this example: static root

    /* The file upload utility */
    let fileUpload = new FileUploadClient({
        path: filesPath,
    });

    /* The button status */
    let disabled = true;

    /* Handles the input file change event */
    const handleFileChange = event => {
        if (event.target.files && event.target.files.length > 0) {
            fileUpload.fromFile(event.target.files[0]); // event.target.files[0] = File
            disabled = !fileUpload.check() ? 'disabled' : '';
        }
    };

    /* Handles the input name change event */
    const handleNameChange = event => {
        fileUpload.name = event.target.value.trim();
        disabled = !fileUpload.check() ? 'disabled' : '';
    };

    /* Handles the submit event */
    const handleSubmit = () => {
        /* Checks if all the data is set */
        if (fileUpload.check()) {
            /* Calls the process on the server (endpoint) */
            fetch('upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(fileUpload),
            })
            /* Handles the response */
            .then(res => {
                if (!res.ok) {  // the response has a bad status (500..)
                    throw new Error('upload error status ' + res.status + ', status text: ' + res.statusText);
                } else {
                    alert('Done! See the uploaded file in the /static directory.');
                }
            })
            .catch(err => alert('Damned: ' + err));
        }
    };

</script>

<div class="flex-col-center">
    <h1>SvelteKit File Upload example</h1>
    <div>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</div>
    <!-- The input file form -->
    <div class="top-2 flex-col-center">
        <div class="">
            <label for="input-file">Choose a file:</label>
            <input type="file"
                   id="input-file"
                   name="input-file"
                   on:change={handleFileChange}
            >
        </div>
        <div class="top-1">
            <label for="file-name">Give it a name + ext:</label>
            <input type="text"
                   id="file-name"
                   name="file-name"
                   value=""
                   on:change={handleNameChange}
            >
        </div>
        <div class="top-1">
            <button class="btn"
                    {disabled}
                    type="submit"
                    on:click={handleSubmit}
            >
                Start
            </button>
        </div>
    </div>
</div>

<style>
    .flex-col-center {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .top-1 {
        margin-top: 1rem;
    }

    .top-2 {
        margin-top: 2rem;
    }
</style>
