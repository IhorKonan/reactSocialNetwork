import { Formik, Form, Field } from "formik";
import React from "react";
import { useSelector } from "react-redux";
//@ts-ignore
import { FilterType } from "../../redux/users-reducer.ts";
//@ts-ignore
import { getUsersFilter } from "../../redux/users-selectors.ts";

const usersSearchFormValidateForm = (value: any) => {
    const errors = {}
    return errors
}
type FriendFormType = 'true' | 'false' | 'null' 

type FormType = {
    term: string,
    friend: FriendFormType
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    
    const filter: FormType = useSelector(getUsersFilter) 

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidateForm}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Friends</option>
                            <option value="false">Possible friends</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default UsersSearchForm