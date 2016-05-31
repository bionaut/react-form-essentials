"DOCS IN PROGRESS"
----------------

**Form syntax**
===================

    <ValidForm errors={errorsObject}
			    debug={true}
			    onSubmit={dummyHandler}>
        <!--children here-->
	</ValidForm>


 - **debug**: will provide form feedback
 - **errors**: send errors object available for all child components
 - **onSubmit**: is a submit handler (use from outside container)

---------------------

**Field syntax**
===================

    <Field name="someName"
       placeholder="HintText"
       required={true}
       validator={isLength:2}
       icons={false}
       label="Some label">
	</Field>

 - **name**: input name
 - **placeholder**: hint text for input
 - **validator**: isLength:1:5|isAlpha|contains:test
 - **icons**: show/hide icons (default: true)
 - **label**: input label

-----------------------------------

**Supported validators:**
A LOT :) 
...comming soon

SAMPLES
=======

![enter image description here](example/gifs/5.gif)

-----------------------------------

![enter image description here](example/gifs/1.gif)

-----------------------------------

![enter image description here](example/gifs/2.gif)

-----------------------------------

![enter image description here](example/gifs/3.gif)

-----------------------------------

![enter image description here](example/gifs/4.gif)