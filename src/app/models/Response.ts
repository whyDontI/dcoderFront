interface Thread {
	_id: String;
	title: String;
	description: String;
	tags: Array<String>;
	username: String;
	date: Date;
}

export interface Response {
	count: Number;
	threads: Array<Thread>;
}